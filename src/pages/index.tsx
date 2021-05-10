import React from "react";
import { ReactSVG } from "react-svg";
import { VideoJsPlayerOptions } from "video.js";

import Section from "../components/Section";
import VideoPlayer from "../components/VideoPlayer";

import { useWindowSize } from "../lib/hooks";

const videoJsOptions: VideoJsPlayerOptions = {
  autoplay: true,
  loop: true,
  controls: false,
  controlBar: false,
  sources: [
    {
      src: "/webm/Eclipse.webm",
      type: "video/webm",
    },
  ],
};

const Home = () => {
  const { isMobile, width, height } = useWindowSize();

  if (!width) return null;

  const svgCicleTextSize = isMobile ? width * 0.4 : width * 0.12;

  return (
    <div className="page-container bg-black">
      <section className="flex flex-col pb-20">
        <div className="h-96 w-full relative md:h-75vh">
          <VideoPlayer {...videoJsOptions} poster="/png/Eclipse.png" />
        </div>

        <div className=" flex flex-col px-7 text-brown-main text-center -mt-28 z-0 md:-mt-52 md:px-40">
          <span className="text-5xl leading-snug md:text-7xl">
            ENJOY AN EVENING WITH NIGHTWISH IN A VIRTUAL WORLD
          </span>

          <span className="text-lg pt-3">
            Fri, May 28th, 2021, Europe Sat, May 29th, 2021, North and South
            America
          </span>
        </div>
      </section>

      <Section
        title="Integer sed varius ante nulla quam sem, semper congue pellentesque at"
        description={
          <>
            Donec libero arcu, elementum vitae dapibus ut, gravida id velit. Ut
            mollis est a elit feugiat consectetur. Aenean vulputate justo et
            risus scelerisque cursus.
          </>
        }
        // onClick={() => console.log("Redeem ticket")}
        buttonText="Redeem Ticket"
        buttonProps={{
          outline: true,
        }}
      />

      <Section
        title="How to Buy Your Ticket and Access the Live Concert"
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
        imgSize="1"
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
        title="How to Buy Your Ticket and Access the Live Concert"
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
        className="flex justify-center"
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
