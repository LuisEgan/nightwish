import React, {
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api";
import { ReactSVG } from "react-svg";
// eslint-disable-next-line
import { Observable, ZenObservable } from "zen-observable-ts";

import Message, { IMessage } from "./Message";
import Input from "../Input";
import { UserContext } from "../../contexts/user/user.context";
import { useWindowSize } from "../../lib/hooks";
import { getRandomColor } from "../../lib/strings";
import { onCreateMessage } from "../../graphql/subscriptions";
import { createMessage } from "../../graphql/mutations";

import styles from "./chat.module.scss";
import { messagesByChannelID } from "../../graphql/queries";

import tw from "../../../tailwind.config.js";

interface IColorsByUsers {
  [username: string]: string;
}

interface ImessagesByChannelID {
  messagesByChannelID: { items: IMessage[] };
}

interface IOnCreateMessage {
  value: { data: { onCreateMessage: IMessage } };
}

const Chat = () => {
  const messagesBottom = useRef<HTMLDivElement>(null);
  const messageInput = useRef<HTMLInputElement>(null);

  const { user } = useContext(UserContext);

  const { isMobile, isLandscape } = useWindowSize();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [mssg, setMssg] = useState<string>("");
  const [error, setError] = useState<string>("");
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

  // * Get initial messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = (await API.graphql(
          graphqlOperation(messagesByChannelID, {
            channelID: "1",
            sortDirection: "ASC",
          }),
        )) as GraphQLResult<ImessagesByChannelID>;

        const initColorsByUsers: IColorsByUsers = {};
        const items: IMessage[] = res.data?.messagesByChannelID?.items.map(
          (item) => {
            if (!initColorsByUsers[item.author]) {
              initColorsByUsers[item.author] =
                item.author === user.name
                  ? tw.theme.extend.colors.brown.light
                  : "white";
            }
            const color = initColorsByUsers[item.author];
            return { ...item, color };
          },
        );

        if (items) {
          setMessages(items);
          setColorsByUsers(initColorsByUsers);
        }
      } catch (e) {
        console.error("getMessages - error: ", e);
      }
    };

    getMessages();
  }, [user.name]);

  // * Subscribe to Appsync to get new messages
  useEffect(() => {
    let subscription: ZenObservable.Subscription;

    if (messages?.length) {
      subscription = (API.graphql(
        graphqlOperation(onCreateMessage),
      ) as Observable<IOnCreateMessage>).subscribe({
        next: (event) => {
          const {
            value: {
              data: {
                onCreateMessage: { author },
              },
            },
          } = event;

          const color = colorsByUsers[author] || getRandomColor();
          const newMessage = {
            ...event.value.data.onCreateMessage,
            color,
          };

          // * only update new incoming messages from other users
          // * this user's messages are being added when sending the message
          // * so it shows it faster
          if (newMessage.author === user.name) return;

          setMessages([...messages, newMessage]);
          setColorsByUsers({ ...colorsByUsers, [author]: getRandomColor() });
        },
      });
    }

    return () => {
      subscription?.unsubscribe();
    };
    // eslint-disable-next-line
  }, [messages]);

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

      // * Set the user's chat color
      let color = colorsByUsers[user.name];
      if (!color) {
        color = getRandomColor();
        setColorsByUsers({
          ...colorsByUsers,
          [user.name]: color,
        });
      }

      // * Add message to current chat on the front
      const body = mssg.trim();
      setMessages([
        ...messages,
        {
          author: user.name,
          body,
          color,
        },
      ]);

      // * Send message
      const input = {
        channelID: "1",
        author: user.name,
        body,
      };

      await API.graphql(graphqlOperation(createMessage, { input }));
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
            src="/svg/x.svg"
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
          messages.map((m) => (
            <Message key={`${Math.random()}_${m.body}`} {...m} />
          ))
        ) : (
          <div
            className="absolute bottom-3 right-5 flex justify-center items-center h-14 w-14 ml-3 rounded-full bg-brown-main cursor-pointer"
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
            className={styles.input}
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
