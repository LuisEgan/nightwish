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
    <div className="relative flex w-full h-auto bg-transparent text-white mb-2 p-1 break-all">
      <div className="absolute h-full w-full top-0 left-0" />
      <div className="z-10">
        <span className="font-bold" style={{ color }}>
          {username}
        </span>
        : &nbsp;<span>{message}</span>
      </div>
    </div>
  );
};

export default Message;
