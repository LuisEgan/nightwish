import React, { ButtonHTMLAttributes, CSSProperties, FC } from "react";
import tw from "../../../tailwind.config.js";

export type TButtonVariant = "primary" | "black" | "brown";
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  outline?: boolean;
  textColor?: string;
}

const Button: FC<IButton> = (props) => {
  const {
    children,
    variant = "primary",
    outline,
    textColor,
    ...buttonProps
  } = props;

  const buttonStyle = () => {
    const style: CSSProperties = {};

    if (variant === "black") {
      style.background = "black";
    }

    if (variant === "brown") {
      style.background = tw.theme.extend.colors.brown.dark;
    }

    return style;
  };

  const spanStyle = () => {
    const style: CSSProperties = {};

    if (variant === "black") {
      style.color = tw.theme.extend.colors.brown.main;
    }

    if (variant === "brown") {
      style.color = tw.theme.extend.colors.brown.main;
    }

    if (textColor) {
      style.color = textColor;
    }

    return style;
  };

  return (
    <button
      {...buttonProps}
      className={`${buttonProps?.className ? buttonProps?.className : ""} ${
        outline
          ? "bg-transparent border-solid border-brown-main "
          : "bg-brown-main border-none"
      }
    `}
      style={buttonStyle()}
    >
      <span
        className={`${outline ? "text-brown-main" : "text-black"}`}
        style={spanStyle()}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
