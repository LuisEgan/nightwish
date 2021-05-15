import React from "react";
import { IUser } from "../../Types/user.types";

export interface IMessage {
  user: IUser;
  text: string;
  color: string;
}

const Message = (props: IMessage) => {
  const { user, text, color } = props;

  return (
    <div
      className="relative flex w-full h-auto bg-transparent text-white mb-2 p-1 break-all"
    >
      <div className="absolute h-full w-full top-0 left-0 bg-gray-600 opacity-50 rounded-r-lg" />
      <div className="z-10">
        <span className="font-bold" style={{ color }}>
          {user.name}
        </span>
        : &nbsp;<span>{text}</span>
      </div>
    </div>
  );
};

export default Message;
