import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import ReconnectingWebSocket from "reconnecting-websocket";

import Message, { IMessage } from "./Message";
import Input from "../Input";
import { useWindowSize } from "../../lib/hooks";
import { checkForURL, getRandomColor } from "../../lib/strings";

import styles from "./chat.module.scss";

import Button from "../Button";
import { BASE_PATH, ROUTES } from "../../lib/constants";

const dev = process.env.NODE_ENV !== "production";

let ws: ReconnectingWebSocket;

interface IWSMessage {
  message: string;
  author: string;
  color: string;
}

const randomUserColor = getRandomColor();
const MESSAGES_QTY_LIMIT = 20;
const MAX_MESSAGES = 5;
let MAX_MESSAGES_TIME_INTERVAL = 5000;
let messagesSentCounter = 0;

const Chat = () => {
  const messagesBottom = useRef<HTMLDivElement>(null);
  const messageInput = useRef<HTMLInputElement>(null);

  const { isMobile, isLandscape } = useWindowSize();

  const [username, setUsername] = useState<string>();
  const [isUsernameSet, setIsUsernameSet] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage | null>();

  const [mssg, setMssg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isChatEnabled, setIsChatEnabled] = useState<boolean>(true);
  const [isWSConnected, setIsWSConnected] = useState<boolean>(false);

  const scrollToBottom = () => {
    if (messagesBottom.current) {
      const scrollHeight = messagesBottom.current?.scrollHeight;
      const height = messagesBottom.current?.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesBottom.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
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

  // * Connect to socket
  useEffect(() => {
    if (isChatEnabled && !isWSConnected) {
      ws = new ReconnectingWebSocket(
        dev
          ? "wss://chat.burst-staging.com/ws"
          : "wss://chat.burst.fi/nightwish",
      );
      setIsWSConnected(true);

      ws.onmessage = (data) => {
        const { message, author, color } = JSON.parse(data.data)
          .body as IWSMessage;

        if (color === randomUserColor) return;

        setNewMessage({
          author,
          body: message,
          color: "white",
        });
      };
    }
  }, [isChatEnabled, isWSConnected]);

  // * Render new message
  useEffect(() => {
    if (newMessage && isChatEnabled) {
      addNewMessage(newMessage);
      setNewMessage(null);
    }
    // eslint-disable-next-line
  }, [newMessage]);

  // * Scroll to bottom when chat is enabled and new message appears
  useEffect(() => {
    if (isChatEnabled && messages.length) {
      scrollToBottom();
    }
  }, [isChatEnabled, messages]);

  const sendMessage = async () => {
    if (messagesSentCounter >= MAX_MESSAGES) {
      MAX_MESSAGES_TIME_INTERVAL += MAX_MESSAGES_TIME_INTERVAL * 0.01;
      return;
    }

    if (!mssg || !ws) return;

    try {
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
      const body = mssg.trim();
      addNewMessage({
        author: username,
        body,
        color: randomUserColor,
      });

      ws.send(
        JSON.stringify({
          action: "message",
          message: body,
          author: username,
          color: randomUserColor,
        }),
      );
    } catch (e) {
      console.error("sendMessage - error: ", e);
      setError(e);
    }
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

  const xSize = isMobile || isLandscape ? "2vw" : "1vw";

  return (
    <div
      className={`${
        isChatEnabled ? "bg-black bg-opacity-50" : ""
      } flex flex-col p-7 pb-0 px-0 h-1/2 w-full md:absolute md:right-0 md:top-0 md:p-3 md:pb-0 md:w-1/5 md:h-90vh`}
      onKeyDown={handleKeyDown}
    >
      <div className="relative flex justify-center items-center text-3xl pb-5 text-brown-light">
        {isChatEnabled ? "Chat" : ""}
        {isChatEnabled && (
          <ReactSVG
            src={`${BASE_PATH}/svg/x.svg`}
            className="cursor-pointer absolute top-0 right-4"
            style={{
              transform: "translateY(50%)",
            }}
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
              <Message key={`${Math.random()}_${m.body}`} {...m} />
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
          <div
            className="absolute bottom-3 right-5 flex justify-center items-center h-14 w-14 ml-3 rounded-full bg-brown-main cursor-pointer"
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
        )}
      </div>

      {isChatEnabled && isUsernameSet && (
        <div className="flex items-center pt-5">
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
