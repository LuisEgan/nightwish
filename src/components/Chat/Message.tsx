import React from "react";

export interface IMessage {
  color?: string;
  username: string;
  message: string;
  messageId: string;
  connectionId: string;
  createdAt?: string;
  updatedAt?: string;
}

const Message = (props: IMessage) => {
  const { username, message, color = "white" } = props;

  return (
    <div className="text-white break-all px-5 py-1">
      <span className="mr-1">
        <strong style={{ color }}>{username}</strong>:
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Message;
