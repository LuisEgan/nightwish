import React, { FC } from "react";
import Image from "next/image";
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
  imageObjectFit?: "cover" | "fill" | "contain";
  imageContainerClassname?: string;
  reverse?: boolean;
  imgSize?: "1" | "3/4" | "2";
  alignText?: boolean;
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
    imageObjectFit = "cover",
    imageContainerClassname = "",
    reverse,
    imgSize = "3/4",
    alignText = true,
  } = props;

  const mdImgSize = `md:flex-${imgSize}`;

  return (
    <section
      className={`${className} relative flex flex-col w-full py-14 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      {img && (
        <Fade left={!reverse} right={reverse}>
          <div
            className={`w-5/6 h-80 relative mb-10 ${imageContainerClassname} md:h-75vh md:w-0 ${mdImgSize}`}
          >
            <Image
              src={img}
              layout="fill"
              objectFit={imageObjectFit}
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
          className={`pb-5 px-7 text-2xl text-brown-main leading-snug md:text-6xl ${
            alignText ? "md:text-right" : ""
          }`}
        >
          {title}
        </div>

        <div>
          <div
            className={`pb-5 px-7 text-lg text-brown-main leading-snug md:text-white md:text-lg md:font-light ${
              alignText ? "md:text-right" : ""
            }`}
          >
            {description}
          </div>

          {onClick && (
            <div className="px-7">
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
