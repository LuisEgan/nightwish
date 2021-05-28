import React from "react";

export interface IMessage {
  username: string;
  message: string;
  messageId: string;
  connectionId: string;
  createdAt?: string;
  updatedAt?: string;
  userColor?: string;
  userTextShadow?: string;
}

const Message = (props: IMessage) => {
  const { username, message, userTextShadow, userColor } = props;

  const userStyles = { color: "", textShadow: "" };
  if (userTextShadow) userStyles.textShadow = userTextShadow;
  if (userColor) userStyles.color = userColor;

  return (
    <div className="text-white break-all px-5 py-1">
      <span className="mr-1">
        {username.indexOf("@") !== -1 ? (
          <strong className="is-operator">
            <span className="is-operator">@</span>
            {username.replace("@", "")}
          </strong>
        ) : username.indexOf("+") !== -1 ? (
          <strong className="is-vip" style={userStyles}>
            <span>+</span>
            {username.replace("+", "")}
          </strong>
        ) : (
          <strong>{username}</strong>
        )}
        :
      </span>
      <span>{message}</span>
    </div>
  );
};

export default Message;
