import React, { ButtonHTMLAttributes, FC } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<IButton> = (props) => {
  const { children, ...buttonProps } = props;

  return (
    <button {...buttonProps} className="p-5">
      {children}{" "}
    </button>
  );
};

export default Button;
