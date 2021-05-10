import React, { useContext, useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import Message, { IMessage } from "./Message";
import Input from "../Input";
import { UserContext } from "../../contexts/user/user.context";
import { useWindowSize } from "../../lib/hooks";

import styles from "./chat.module.scss";
import { getRandomColor } from "../../lib/strings";

interface IColorsByUsers {
  [username: string]: string;
}

const Chat = () => {
  const messagesBottom = useRef<HTMLDivElement>(null);
  const messageInput = useRef<HTMLInputElement>(null);

  const { user } = useContext(UserContext);

  // const { query } = useRouter();
  const { isMobile, isLandscape } = useWindowSize();

  const [mssg, setMssg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isChatEnabled, setIsChatEnabled] = useState<boolean>(true);
  const [colorsByUsers, setColorsByUsers] = useState<IColorsByUsers>({});

  const scrollToBottom = () => {
    if (messagesBottom.current) {
      const scrollHeight = messagesBottom.current?.scrollHeight;
      const height = messagesBottom.current?.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messagesBottom.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  // * Scroll to bottom when new message appears
  useEffect(() => {
    if (messages.length) {
      scrollToBottom();
    }
  }, [messages]);

  // * Scroll to bottom when chat is enabled
  useEffect(() => {
    if (isChatEnabled) {
      scrollToBottom();
    }
  }, [isChatEnabled]);

  const sendMessage = () => {
    if (!mssg) return;

    if (mssg.length > 100) {
      setError("Message too large! Max 100 characters");
      return;
    }

    // * Resetting value like this because controlled Input was lagging too much
    (document.getElementById("messageInput") as HTMLInputElement).value = "";

    const color = colorsByUsers[user.name] || getRandomColor();

    setMssg("");
    setError("");
    setColorsByUsers({
      ...colorsByUsers,
      [user.name]: color,
    });
    setMessages([
      ...messages,
      {
        text: mssg,
        user,
        color,
      },
    ]);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const xSize = isMobile || isLandscape ? "5vw" : "1vw";

  return (
    <div
      className={isLandscape ? styles.containerLandscape : styles.container}
      onKeyDown={handleKeyDown}
    >
      <div className="relative flex justify-center items-center text-3xl pb-5 text-brown-light">
        {isLandscape ? "" : "Chat"}
        {isChatEnabled && (
          <ReactSVG
            src="/svg/x.svg"
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

      <div
        ref={messagesBottom}
        className={`h-40 w-full overflow-auto md:flex-1 ${
          isLandscape ? "bg-red" : "bg-black"
        }`}
      >
        {isChatEnabled ? (
          messages.map((m) => (
            <Message key={`${Math.random()}_${m.text}`} {...m} />
          ))
        ) : (
          <div
            className={styles.enableChatButton}
            onClick={() => setIsChatEnabled(true)}
          >
            <ReactSVG
              src="/svg/chat.svg"
              height={20}
              width={20}
              beforeInjection={(svg) => {
                svg.setAttribute("style", `width: ${30}px; height: ${30}px;`);
              }}
            />
          </div>
        )}
      </div>

      {isChatEnabled && (
        <div className="flex items-center pt-5">
          <Input
            id="messageInput"
            ref={messageInput}
            placeholder="Type a message"
            onChange={(e) => setMssg(e.target.value)}
            variant="black"
            containerClassName="flex-1"
            className={isLandscape ? styles.inputLandscape : ""}
            maxLength={100}
            error={error}
          />

          <div
            className="flex justify-center items-center h-10 w-10 ml-3 rounded-full bg-brown-main cursor-pointer"
            onClick={sendMessage}
          >
            <ReactSVG
              src="/svg/send.svg"
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
