import React from "react";
import { ReactSVG } from "react-svg";

import Section from "../components/Section";
import { BUY_TICKET_LINK } from "../lib/constants";

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
            src="/png/hero2x.png"
            alt="tabern"
            className="object-cover h-full w-full"
          />
          <div className="absolute h-full w-full top-0 left-0 z-10 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="z-20 flex flex-col px-7 text-brown-main text-center -mt-40 md:-mt-52 md:px-40">
          <span className="text-5xl leading-snug md:text-7xl">
            WE HEARTLY WELCOME YOU TO SPEND AN EVENING WITH NIGHTWISH AT THE
            ISLANDERS ARMS
          </span>

          <span className="text-lg pt-3">
            <b>Fri, May 28, 2021</b> <br />
            Europe: 8pm CEST / 7pm BST, duration approx. 90min <br />
            <br /> <b>Sat, May 29, 2021</b>
            <br /> North and South America: 8pm ET (UTC-4) / 5pm PT (UTC -7) /
            9pm BRT (UTC-3) / 7pm CST (UTC -5), Europe: <br />
            <br />
            <b>Sun, May 30, 2021</b>
            <br />
            2am CEST / 1am BST, duration approx. 90min
          </span>
        </div>
      </section>

      <Section
        descriptionClassname="text-left mt-4 px-7"
        titleClassname="text-right px-0"
        title="The band offers fans a unique experience by inviting them to a
        shared adventure at The Islanders Arms, a tavern built in virtual reality."
        description={
          <>
            A full-length live experience that reaches magical dimensions will
            be set in virtual reality – The Islander Inn tavern. During the show
            the band and the audience will dive together into diverse imaginary
            3D worlds. On both evenings, the audience can expect an
            unforgettable 90-minute performance, and will get to hear songs from
            the latest album ”Human. :II: Nature.” live for the first time. The
            setlist has variation for each night.
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
        img="/png/zepellin2x.png"
      />

      <Section
        title="Chat with other fans. Engage with your friends and meet other fans around the world."
        titleClassname="text-left"
        description={
          <>
            Donec libero arcu, elementum vitae dapibus ut, gravida id velit. Ut
            mollis est a elit feugiat consectetur. Aenean vulputate justo et
            risus scelerisque cursus.
          </>
        }
        // onClick={() => console.log("Redeem ticket")}
        buttonText="Redeem Ticket"
        img="/png/iphone2x.png"
        imageContainerClassname="mx-7"
        imageClassname="object-contain"
        imgSize="flex-1"
      >
        <ReactSVG
          src="/svg/circleText.svg"
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
        img="/png/church2x.png"
      />

      <ReactSVG
        src="/svg/logo.svg"
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
