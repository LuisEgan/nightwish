import React, { forwardRef, InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLButtonElement> {
  title?: string;
  hint?: string;
  error?: string | undefined;
}

// eslint-disable-next-line
const Input = forwardRef((props: IInput, ref) => {
  const { title, hint, error, ...inputProps } = props;

  return (
    <div className="input">
      <span className="text-sm">{title}</span>
      <input
        {...inputProps}
        className={`border-solid border-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      <span className="text-xs text-gray-400">{hint}</span>
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
