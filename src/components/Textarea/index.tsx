import React, { forwardRef, TextareaHTMLAttributes } from "react";

interface ITextareat extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  title?: string;
  hint?: string;
  error?: string | undefined;
  icon?: JSX.Element;
  outline?: boolean;
  containerClassName?: string;
  textarea?: boolean;
}

// eslint-disable-next-line
const Input = forwardRef((props: ITextareat, ref) => {
  const {
    title,
    hint,
    error,
    icon,
    outline,
    containerClassName,
    textarea,
    ...textareaProps
  } = props;

  const inputClass = `w-full border-2 rounded-2xl py-3 px-4 border-solid  ${
    outline
      ? "border-brown-main bg-black placeholder-brown-main"
      : "border-black bg-brown-main placeholder-black"
  } ${error ? "border-red-500" : ""}`;

  return (
    <div className={`input ${containerClassName}`}>
      {title && <span className="text-sm">{title}</span>}

      <div className="relative">
        <textarea {...textareaProps} className={inputClass} />
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
