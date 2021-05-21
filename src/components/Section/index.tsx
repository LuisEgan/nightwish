import React, { FC } from "react";
import Fade from "react-reveal/Fade";
import Button, { IButton } from "../Button";

interface ISection {
  title: string | JSX.Element;
  description: string | JSX.Element;
  className?: string;
  img?: string;
  onClick?: () => void;
  buttonProps?: Omit<IButton, "onClick">;
  buttonText?: string;
  imageClassname?: string;
  imageContainerClassname?: string;
  reverse?: boolean;
  imgSize?: "flex-1" | "flex-1.5" | "flex-2";
  descriptionClassname?: string;
  titleClassname?: string;
}

const Section: FC<ISection> = (props) => {
  const {
    children,
    title,
    description,
    className = "",
    img,
    onClick,
    buttonProps,
    buttonText,
    imageClassname,
    imageContainerClassname = "",
    reverse,
    imgSize = "flex-1.5",
    descriptionClassname,
    titleClassname,
  } = props;

  return (
    <section
      className={`${className} relative flex flex-col w-full md:py-14 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {img && (
        <Fade left={!reverse} right={reverse}>
          <div
            className={`w-5/6 h-40 relative ${imageContainerClassname} md:h-75vh md:mb-10 md:w-0 ${imgSize}`}
          >
            <img
              className={`m-auto h-full object-contain ${imageClassname}`}
              src={img}
              alt="section"
            />
          </div>
        </Fade>
      )}

      <div
        className={`${
          img
            ? "md:w-0 md:flex-1 md:flex md:flex-col md:justify-center"
            : "md:flex md:px-44"
        } ${reverse ? "md:pl-20" : "md:pr-20"}`}
      >
        <div
          className={`${titleClassname} pb-5 text-2xl text-brown-main leading-snug md:text-6xl`}
        >
          {title}
        </div>

        <div>
          <div
            className={`${descriptionClassname} pb-5 text-lg text-brown-main leading-snug md:text-white md:text-lg md:font-light`}
          >
            {description}
          </div>

          {onClick && (
            <div className="px-7 py-10">
              <Button {...buttonProps} onClick={onClick}>
                {buttonText}
              </Button>
            </div>
          )}
        </div>
      </div>

      {children}
    </section>
  );
};

export default Section;
