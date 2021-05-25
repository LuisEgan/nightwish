import React from "react";
import { ReactSVG } from "react-svg";

import Section from "../components/Section";
import { BASE_PATH, BUY_TICKET_LINK } from "../lib/constants";

import { useWindowSize } from "../lib/hooks";

const Home = () => {
  const { isMobile, width, height } = useWindowSize();

  if (!width) return null;

  const svgCicleTextSize = isMobile ? width * 0.4 : width * 0.12;

  const onBuyTicket = () => {
    window.open(BUY_TICKET_LINK, "_blank");
  };

  return (
    <div className="page-container bg-black">
      <section className="flex flex-col pb-20">
        <div className="h-96 w-full relative md:h-75vh">
          <img
            src={`${BASE_PATH}/png/hero-background@2x.png`}
            alt="The Islanders Arms"
            className="object-cover h-full w-full"
          />
          <div className="absolute h-1/2 w-full top-1/2 left-0 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="z-10 text-brown-main text-center max-w-5xl mx-auto -mt-40 md:-mt-80">
          <h1
            className="text-4xl xl:text-8xl md:text-7xl mb-10 tracking-wider leading-none uppercase"
            style={{ lineHeight: 1.1 }}
          >
            Welcome to an evening with nightwish at The Islanders Arms
          </h1>

          <p className="text-lg mb-8 leading-relaxed">
            Fri, May 28, 2021
            <br />
            Europe: 9pm EEST (Finland) / 8pm CEST / 7pm BST, duration approx.
            90min
          </p>
          <p className="text-lg">
            Sat, May 29, 2021
            <br />
            North and South America: 8pm ET (UTC-4) / 5pm PT (UTC -7) /9pm BRT
            (UTC-3) / 7pm CST (UTC-5),
            <br />
            Europe: Sun, May 30, 2021, 3am EEST (Finland) / 2am CEST / 1am BST,
            duration approx. 90min
          </p>
        </div>
      </section>

      <Section
        descriptionClassname="text-left mt-4 pl-7"
        titleClassname="pr-7 md:text-right"
        title="Nightwish invites you to a shared adventure at The Islanders Arms, a tavern built in virtual reality."
        center
        description={
          <>
            A full-length live experience of magical dimensions in a virtual
            world The Islander Arms tavern. On both evenings, an unforgettable
            90-minute performance, the songs from the latest album “Human. :II:
            Nature. ”will be played live for the first time. The setlist has
            variations for each night.
          </>
        }
        onClick={onBuyTicket}
        buttonText="Buy Ticket"
        buttonProps={{
          outline: true,
          style: {
            margin: "auto",
          },
        }}
      />

      <Section
        title="How to Buy Your Ticket and Access the Live Concert"
        titleClassname="px-7"
        descriptionClassname="px-7"
        className="pb-10"
        description={
          <>
            Duis ac pretium dolor, ac tincidunt orci. Vivamus posuere ac mi
            accumsan molestie. Suspendisse nec finibus odio. Nulla facilisi.{" "}
            <br />
            <br /> Donec libero arcu, elementum vitae dapibus ut, gravida id
            velit. Ut mollis est a elit feugiat consectetur. Aenean vulputate
            justo et risus scelerisque cursus.
          </>
        }
        // onClick={() => console.log("Redeem ticket")}
        buttonText="Redeem Ticket"
        img={`${BASE_PATH}/png/zepellin2x.png`}
      />

      <Section
        title="Chat with other fans. Engage with your friends and meet other fans around the world."
        titleClassname="text-left px-7 md:px-0"
        descriptionClassname="px-7 md:px-0"
        description={
          <>
            Donec libero arcu, elementum vitae dapibus ut, gravida id velit. Ut
            mollis est a elit feugiat consectetur. Aenean vulputate justo et
            risus scelerisque cursus.
          </>
        }
        // onClick={() => console.log("Redeem ticket")}
        buttonText="Redeem Ticket"
        img={`${BASE_PATH}/png/iphone2x.png`}
        imageContainerClassname="mx-7"
        imageClassname="object-contain"
        imgSize="flex-1"
      >
        <ReactSVG
          src={`${BASE_PATH}/svg/circleText.svg`}
          height={svgCicleTextSize}
          width={svgCicleTextSize}
          className="absolute top-0 left-5 md:left-auto md:right-20"
          beforeInjection={(svg) => {
            svg.setAttribute(
              "style",
              `width: ${svgCicleTextSize}px; height: ${svgCicleTextSize}px;`,
            );
          }}
        />
      </Section>

      <Section
        reverse
        titleClassname="px-7 text-right"
        title="How to Buy Your Ticket and Access the Live Concert"
        descriptionClassname="px-7 text-right"
        description={
          <>
            Duis ac pretium dolor, ac tincidunt orci. Vivamus posuere ac mi
            accumsan molestie. Suspendisse nec finibus odio. Nulla facilisi.{" "}
            <br />
            <br /> Donec libero arcu, elementum vitae dapibus ut, gravida id
            velit. Ut mollis est a elit feugiat consectetur. Aenean vulputate
            justo et risus scelerisque cursus.
          </>
        }
        // onClick={() => console.log("Redeem ticket")}
        buttonText="Redeem Ticket"
        img={`${BASE_PATH}/png/church2x.png`}
      />

      <ReactSVG
        src={`${BASE_PATH}/svg/logo.svg`}
        height={height * 0.2}
        width={width * 0.8}
        className="flex justify-center py-10"
        beforeInjection={(svg) => {
          svg.setAttribute(
            "style",
            `width: ${width * 0.8}px; height: ${height * 0.2}px;`,
          );
        }}
      />
    </div>
  );
};

export default Home;
