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
  center?: boolean;
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
    center,
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
            className={`w-full relative ${imageContainerClassname} md:mb-10 md:w-0 ${imgSize}`}
          >
            <img
              className={`m-auto object-contain ${imageClassname || ""}`}
              src={img}
              alt="section"
            />
          </div>
        </Fade>
      )}

      <div
        className={`${
          img
            ? "py-7 md:py-0 md:w-0 md:flex-1 md:flex md:flex-col md:justify-center"
            : "md:flex md:px-4 lg:px-8 xl:px-30 2xl:px-40"
        } ${center ? "" : reverse ? "md:pl-20" : "md:pr-20"}`}
      >
        <div
          className={`${titleClassname} pb-5 text-3xl text-brown-main leading-snug md:text-4xl lg:text-6xl ${
            center && "flex-1"
          }`}
        >
          {title}
        </div>

        <div className={`${descriptionClassname} ${center && "flex-1"}`}>
          <div className="pb-5 text-xl text-brown-main leading-snug md:text-white md:text-lg md:font-light">
            {description}
          </div>

          {onClick && (
            <div className="pt-4 pb-5 mb-7">
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
