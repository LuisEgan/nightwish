import React from "react";
import { useWindowSize } from "../../lib/hooks";
import { IUser } from "../../Types/user.types";

import styles from "./chat.module.scss";

export interface IMessage {
  user: IUser;
  text: string;
  color: string;
}

const Message = (props: IMessage) => {
  const { user, text, color } = props;

  const { isLandscape } = useWindowSize();

  return (
    <div
      className={
        isLandscape ? styles.messageContainerLandscape : styles.messageContainer
      }
    >
      <span className="font-bold" style={{ color }}>
        {user.name}
      </span>
      : &nbsp;<span>{text}</span>
    </div>
  );
};

export default Message;
