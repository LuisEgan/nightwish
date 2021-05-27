import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import ReconnectingWebSocket from "reconnecting-websocket";

import Message, { IMessage } from "./Message";
import Input from "../Input";
import { checkForURL, getRandomColor } from "../../lib/strings";

import styles from "./chat.module.scss";

import Button from "../Button";
import { BASE_PATH, LOCAL_STORAGE, ROUTES } from "../../lib/constants";

const dev = process.env.NODE_ENV !== "production";

let ws: ReconnectingWebSocket;

interface IWSPayload {
  body: { message: string; username: string; action: "message" | "remove" };
  connectionId: string;
  messageId: string;
  timestamp: number;
}

interface IWSMessage {
  message: string;
  action: string;
  username: string;
}

const randomUserColor = getRandomColor();
const MESSAGES_QTY_LIMIT = 20;
const MAX_MESSAGES = 5;
let MAX_MESSAGES_TIME_INTERVAL = 5000;
let messagesSentCounter = 0;

interface IChat {
  showChatbutton?: boolean;
}

const Chat = (props: IChat) => {
  const { showChatbutton = true } = props;

  const messagesBottom = useRef<HTMLDivElement>(null);
  const messageInput = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState<string>();
  const [isUsernameSet, setIsUsernameSet] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage | null>();
  const [removeMessageId, setRemoveMessageId] = useState<string | null>();

  const [mssg, setMssg] = useState<string>("");
  const [error, setError] = useState<string>("");
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

  // * Connect to socket
  useEffect(() => {
    if (isChatEnabled && !isWSConnected && isUsernameSet) {
      ws = new ReconnectingWebSocket(
        dev
          ? "wss://chat.burst-staging.com/ws"
          : "wss://chat.burst.fi/nightwish",
      );

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
            color: usernamePayload === username ? randomUserColor : "white",
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
        throw new Error("No message!");
      }

      if (!ws) {
        throw new Error("Conn error");
      }

      if (mssg.length > 100) {
        throw new Error("Message too large! Max 100 characters");
      }

      if (checkForURL(mssg)) {
        throw new Error("Message can't contain URLs");
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
      console.error("sendMessage - error: ", e);
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const confirmUsername = () => {
    if (username) {
      setIsUsernameSet(true);
    }
  };

  const xSize = "20px";

  return (
    <div
      className={`${
        isChatEnabled ? "bg-black md:bg-opacity-70" : ""
      } z-50 fixed bottom-0 flex flex-col p-7 pb-0 px-10 h-75vh w-full rounded-t-3xl md:rounded-3xl md:right-0 md:p-3 md:pb-0 md:w-1/4 md:h-90vh`}
      onKeyDown={handleKeyDown}
    >
      <div className="relative flex justify-center items-center text-3xl pb-5 text-brown-light">
        {isChatEnabled ? "Chat" : ""}
        {isChatEnabled && (
          <ReactSVG
            src={`${BASE_PATH}/svg/x.svg`}
            className="cursor-pointer absolute top-0 right-4"
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

      <div ref={messagesBottom} className="flex-1 w-full overflow-auto">
        {isChatEnabled ? (
          isUsernameSet ? (
            messages.map((m) => (
              <Message key={`${Math.random()}_${m.message}`} {...m} />
            ))
          ) : (
            <div className="h-full flex justify-center items-center">
              <div className="flex flex-col">
                <div className="flex flex-col justify-center">
                  <Input
                    placeholder="Chat username"
                    onChange={(e) => setUsername(e.target.value.substr(0, 10))}
                    variant="black"
                    className={styles.input}
                    maxLength={10}
                  />
                  <Button onClick={confirmUsername}>Set username</Button>
                  <div className="text-brown-light text-xs text-center mt-5">
                    <b>Disclaimer:</b> Remember that the chat is for the fans
                    only and not for unnecessary profanities or technical
                    support. If you&apos;re having problems, please check out
                    our{" "}
                    <a
                      className="underline"
                      href={`${BASE_PATH}${ROUTES.PUBLIC_ROUTES.support}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Support Page
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        ) : (
          showChatbutton && (
            <div
              className="fadeIn absolute bottom-3 right-5 flex justify-center items-center h-14 w-14 ml-3 rounded-full bg-brown-main cursor-pointer"
              onClick={() => setIsChatEnabled(true)}
            >
              <ReactSVG
                src={`${BASE_PATH}/svg/chat.svg`}
                height={20}
                width={20}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", `width: ${30}px; height: ${30}px;`);
                }}
              />
            </div>
          )
        )}
      </div>

      {isChatEnabled && isUsernameSet && (
        <div className="flex items-center pb-10">
          <Input
            id="messageInput"
            ref={messageInput}
            placeholder="Type a message"
            onChange={(e) => setMssg(e.target.value)}
            variant="black"
            containerClassName="flex-1"
            className={styles.input}
            maxLength={100}
            error={error}
            autoComplete="off"
          />

          <div
            className="flex justify-center items-center h-10 w-10 ml-3 rounded-full bg-brown-main cursor-pointer"
            onClick={sendMessage}
          >
            <ReactSVG
              src={`${BASE_PATH}/svg/send.svg`}
              height={20}
              width={20}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: ${20}px; height: ${20}px;`);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
