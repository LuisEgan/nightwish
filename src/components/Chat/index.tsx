import React, { useEffect, useRef, useState, useContext } from "react";
import { ReactSVG } from "react-svg";
import ReconnectingWebSocket from "reconnecting-websocket";

import Message, { IMessage } from "./Message";
import Input from "../Input";
import { checkForURL } from "../../lib/strings";

import styles from "./chat.module.scss";

import Button from "../Button";
import {
  getChatEndpoint,
  BASE_PATH,
  LOCAL_STORAGE,
  ROUTES,
} from "../../lib/constants";
import { UserContext } from "../../contexts/user/user.context";

let ws: ReconnectingWebSocket;

interface IWSPayload {
  body: {
    message?: string;
    username?: string;
    action: "message" | "remove";
    messageId?: string;
  };
  connectionId: string;
  messageId: string;
  timestamp: number;
}

interface IWSMessage {
  message: string;
  action: string;
  username: string;
}

// const randomUserColor = getRandomColor();
const MESSAGES_QTY_LIMIT = 20;
const MAX_MESSAGES = 5;
let MAX_MESSAGES_TIME_INTERVAL = 5000;
let messagesSentCounter = 0;

const Chat = () => {
  const messagesBottom = useRef<HTMLDivElement>(null);
  const messageInput = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState<string>();
  const [isUsernameSet, setIsUsernameSet] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage | null>();
  const [removeMessageId, setRemoveMessageId] = useState<string | null>();
  const { isLoggedIn, user } = useContext(UserContext);

  const [mssg, setMssg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showChatbutton, setShowChatButton] = useState<boolean>(false);
  const [isChatEnabled, setIsChatEnabled] = useState<boolean>(false);
  const [isWSConnected, setIsWSConnected] = useState<boolean>(false);

  const scrollToBottom = () => {
    if (messagesBottom.current) {
      const scrollHeight = messagesBottom.current?.scrollHeight;
      const height = messagesBottom.current?.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesBottom.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    if (isLoggedIn === undefined) return;
    if (!isLoggedIn) {
      if (ws && isWSConnected) {
        ws.close(1000, "banned");
        ws = undefined;
        setIsWSConnected(false);
      }
      setIsUsernameSet(false);
      setUsername(undefined);
      setIsChatEnabled(false);
      setShowChatButton(false);
    }
    if (
      !user.registeredTicketTypes ||
      user.registeredTicketTypes.length === 0
    ) {
      return;
    }
    setIsChatEnabled(false);
    setShowChatButton(isLoggedIn);
  }, [isLoggedIn, user]);

  // * Connect to socket
  useEffect(() => {
    if (isChatEnabled && !isWSConnected && isUsernameSet) {
      ws = new ReconnectingWebSocket(getChatEndpoint());

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            action: "authenticate",
            accessToken: localStorage.getItem(LOCAL_STORAGE.USER_TOKEN),
          }),
        );
        setIsWSConnected(true);
      };

      ws.onclose = (event) => {
        if (event.wasClean) {
          ws.close(1000, "banned");
        }
      };

      ws.onmessage = (data) => {
        const payload = JSON.parse(data.data) as IWSPayload;
        if (!payload?.body) return;

        const { body, connectionId, messageId } = payload;
        const { action, message, username: usernamePayload } = body;

        if (action === "remove") {
          setRemoveMessageId(messageId);
        } else {
          setNewMessage({
            username: usernamePayload,
            message,
            connectionId,
            messageId,
          });
        }
      };
    }
  }, [isChatEnabled, isWSConnected, username, isUsernameSet]);

  // * Render new message
  useEffect(() => {
    if (newMessage && isChatEnabled) {
      addNewMessage(newMessage);
      setNewMessage(null);
    }
    // eslint-disable-next-line
  }, [newMessage]);

  // * Remove message
  useEffect(() => {
    if (removeMessageId && isChatEnabled) {
      deleteMessage(removeMessageId);
      setRemoveMessageId(null);
    }
    // eslint-disable-next-line
  }, [removeMessageId]);

  // * Scroll to bottom when chat is enabled and new message appears
  useEffect(() => {
    if (isChatEnabled && messages.length) {
      scrollToBottom();
    }
  }, [isChatEnabled, messages]);

  const sendMessage = async () => {
    try {
      if (messagesSentCounter >= MAX_MESSAGES) {
        MAX_MESSAGES_TIME_INTERVAL += MAX_MESSAGES_TIME_INTERVAL * 0.01;
        throw new Error("Don't spam!");
      }

      if (!mssg) {
        return;
      }

      if (!ws) {
        throw new Error("Connection to the chat data highway is weak");
      }

      if (mssg.length > 100) {
        throw new Error("Small messages please. Max 100 characters");
      }

      if (checkForURL(mssg)) {
        throw new Error("Ehm, don't send links.");
      }

      // * Reset error
      setError("");

      // * Resetting value like this because controlled Input was lagging too much
      (document.getElementById("messageInput") as HTMLInputElement).value = "";
      setMssg("");

      // * Add message to current chat on the front
      const message = mssg.trim();

      const sendNewMessage: IWSMessage = {
        action: "message",
        message,
        username,
      };
      ws.send(JSON.stringify(sendNewMessage));
    } catch (e) {
      setError(e.message || e);
    }
  };

  const updateSentMessagesCounter = () => {
    messagesSentCounter += 1;
    setTimeout(() => {
      messagesSentCounter -= 1;
    }, MAX_MESSAGES_TIME_INTERVAL);
  };

  const addNewMessage = (message: IMessage) => {
    const newMessages = [...messages, message];

    if (newMessages.length > MESSAGES_QTY_LIMIT) {
      newMessages.shift();
    }

    setMessages(newMessages);
    updateSentMessagesCounter();
  };

  const deleteMessage = (removeId: string) => {
    const newMessages = messages.filter(
      ({ messageId }) => removeId !== messageId,
    );
    setMessages(newMessages);
  };

  const confirmUsername = () => {
    if (username) {
      setIsUsernameSet(true);
    }
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const xSize = "1rem";

  return (
    <>
      <div
        className={`${
          isChatEnabled ? "chat-enabled" : "chat-disabled"
        } bg-black z-50 fixed bottom-0 flex flex-col top-24 lg:top-28 md:right-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.85);" }}
      >
        <div className="relative flex justify-center items-center text-3xl pb-5 text-brown-light">
          {isChatEnabled && (
            <ReactSVG
              src={`${BASE_PATH}/svg/x.svg`}
              className="cursor-pointer absolute top-0 right-0 p-4"
              onClick={() => setIsChatEnabled(false)}
              beforeInjection={(svg) => {
                svg.setAttribute(
                  "style",
                  `width: ${xSize}; height: ${xSize}; fill:white`,
                );
              }}
            />
          )}
        </div>
        <div
          ref={messagesBottom}
          className="flex-1 w-full overflow-auto chat-messages"
        >
          {isChatEnabled ? (
            isUsernameSet ? (
              messages.map((m) => <Message key={m.messageId} {...m} />)
            ) : (
              <div className="h-full flex justify-center items-center">
                <div className="flex flex-col">
                  <div className="flex flex-col justify-center">
                    <div className="text-brown-light text-sm text-center -mt-20 mb-10">
                      <h3 className="text-3xl mb-5">
                        Welcome to the
                        <br />
                        Nightwish event chat
                      </h3>
                      <p className="px-10">
                        Remember that the chat is for fans only and not for
                        unnecessary profanities, toxic behaviour or technical
                        support. If you´re having problems, please check out our{" "}
                        <a
                          className="underline"
                          href={`${BASE_PATH}${ROUTES.PUBLIC_ROUTES.support}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Support Page
                        </a>
                        .
                      </p>
                    </div>
                    <form className="px-10 text-center">
                      <p className="text-brown-light mb-2 text-sm">
                        Your handle
                      </p>
                      <Input
                        placeholder="Type in your handle"
                        onChange={(e) =>
                          setUsername(e.target.value.substr(0, 10))
                        }
                        variant="black"
                        className={`${styles.input} text-center text-lg`}
                        maxLength={10}
                      />
                      <Button
                        onClick={confirmUsername}
                        className="mx-auto mt-3 px-9 py-3 "
                      >
                        Join
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            )
          ) : null}
        </div>
        {isChatEnabled && isUsernameSet && (
          <form
            className="flex items-center pb-1 px-4"
            onSubmit={handleMessageSubmit}
          >
            <Input
              id="messageInput"
              ref={messageInput}
              placeholder="Type your message here"
              onChange={(e) => setMssg(e.target.value)}
              variant="black"
              containerClassName="flex-1"
              maxLength={100}
              error={error}
              autoComplete="off"
              className={`${
                error ? "" : "mb-5"
              } bg-transparent text-brown-light placeholder-yellow-800::placeholder`}
            />

            <button
              className="flex justify-center items-center border-none ml-3 rounded-full bg-brown-main cursor-pointer px-3"
              onClick={sendMessage}
            >
              <ReactSVG
                src={`${BASE_PATH}/svg/send.svg`}
                height={20}
                width={20}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", `width: ${20}px; height: ${20}px;`);
                }}
                style={{ marginTop: "2px", marginRight: "2px" }}
              />
            </button>
          </form>
        )}
        {!isChatEnabled && showChatbutton && (
          <div className="absolute bottom-5 right-5" style={{ width: "11rem" }}>
            <div
              className="fadeIn flex justify-center items-center rounded-full bg-brown-main cursor-pointer pr-6 pl-5 pt-3 pb-3 text-lg"
              onClick={() => setIsChatEnabled(true)}
            >
              <ReactSVG
                src={`${BASE_PATH}/svg/chat.svg`}
                height={20}
                width={20}
                className="mr-2"
                beforeInjection={(svg) => {
                  svg.setAttribute("style", `width: ${30}px; height: ${30}px;`);
                }}
              />
              <span style={{ marginBottom: "0.15rem" }}>Open chat</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
