import React from "react";

export interface IMessage {
  color: string;
  id: string;
  author: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

const Message = (props: IMessage) => {
  const { author, body, color } = props;

  return (
    <div className="relative flex w-full h-auto bg-transparent text-white mb-2 p-1 break-all">
      <div className="absolute h-full w-full top-0 left-0 bg-gray-600 opacity-50 rounded-r-lg" />
      <div className="z-10">
        <span className="font-bold" style={{ color }}>
          {author}
        </span>
        : &nbsp;<span>{body}</span>
      </div>
    </div>
  );
};

export default Message;
