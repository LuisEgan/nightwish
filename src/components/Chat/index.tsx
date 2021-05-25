import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import ReconnectingWebSocket from "reconnecting-websocket";

import Message, { IMessage } from "./Message";
import Input from "../Input";
import { useWindowSize } from "../../lib/hooks";
import { getRandomColor } from "../../lib/strings";

import styles from "./chat.module.scss";

import Button from "../Button";
import { BASE_PATH } from "../../lib/constants";

let ws: ReconnectingWebSocket;

interface IWSMessage {
  message: string;
  author: string;
  color: string;
}

const Chat = () => {
  const messagesBottom = useRef<HTMLDivElement>(null);
  const messageInput = useRef<HTMLInputElement>(null);

  const { isMobile, isLandscape } = useWindowSize();

  const [username, setUsername] = useState<string>();
  const [userColor, setUserColor] = useState<string>();
  const [isUsernameSet, setIsUsernameSet] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState<IMessage | null>();

  const [mssg, setMssg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isChatEnabled, setIsChatEnabled] = useState<boolean>(true);

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
    ws = new ReconnectingWebSocket("wss://chat.burst-staging.com/ws");

    const randomUserColor = getRandomColor();

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

    setUserColor(randomUserColor);
  }, []);

  // * Render new message
  useEffect(() => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
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
    if (!mssg) return;

    try {
      if (mssg.length > 100) {
        throw new Error("Message too large! Max 100 characters");
      }

      // * Reset error
      setError("");

      // * Resetting value like this because controlled Input was lagging too much
      (document.getElementById("messageInput") as HTMLInputElement).value = "";
      setMssg("");

      // * Add message to current chat on the front
      const body = mssg.trim();
      setMessages([
        ...messages,
        {
          author: username,
          body,
          color: userColor,
        },
      ]);

      ws.send(
        JSON.stringify({
          action: "message",
          message: body,
          author: username,
          color: userColor,
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
