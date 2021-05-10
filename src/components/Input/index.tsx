import React, { forwardRef, InputHTMLAttributes } from "react";

import styles from "./input.module.scss";

export type TInputVariant = "primary" | "black";
interface IInput extends InputHTMLAttributes<HTMLButtonElement> {
  title?: string;
  hint?: string;
  error?: string | undefined;
  icon?: JSX.Element;
  outline?: boolean;
  containerClassName?: string;
  textarea?: boolean;
  variant?: TInputVariant;
}

// eslint-disable-next-line
const Input = forwardRef<HTMLInputElement, IInput>((props: IInput, ref) => {
  const {
    title,
    hint,
    error,
    icon,
    outline,
    containerClassName,
    textarea,
    variant = "primary",
    ...inputProps
  } = props;

  const inputClass = () => {
    let css = `${inputProps.className} ${styles[variant]}`;

    if (error) {
      css += ` ${styles.error}`;
    }

    return css;
  };

  return (
    <div className={`input ${containerClassName || ""}`}>
      {title && <span className="text-sm">{title}</span>}

      <div className="relative">
        <input {...inputProps} ref={ref} className={inputClass()} />
        {icon && (
          <div className="absolute h-full right-4 top-0 bottom-0 flex items-center cursor-pointer">
            {icon}
          </div>
        )}
      </div>
      {hint && <span className="text-xs text-gray-400">{hint}</span>}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
