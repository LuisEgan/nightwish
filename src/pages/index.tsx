import React, { useEffect, useContext } from "react";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";

import { UserContext } from "../contexts/user/user.context";

import Section from "../components/Section";
import { BASE_PATH, BUY_TICKET_LINK, ROUTES } from "../lib/constants";

import { useWindowSize } from "../lib/hooks";

const Home = () => {
  const { isMobile, width, height } = useWindowSize();
  const router = useRouter();
  const { setTicketCode, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // check if we have ticket ID
    const hasTicketInUrl = window.location.href.match(
      /nightwish\/[0-9]{20,30}/,
    );
    if (hasTicketInUrl) {
      const ticketCodeFromURL = hasTicketInUrl[0].substr(10);
      setTicketCode(ticketCodeFromURL);
      if (isLoggedIn) {
        router.push(ROUTES.PRIVATE_ROUTES.ticket);
      } else {
        router.push(ROUTES.PUBLIC_ROUTES.register);
      }
    }
  }, []);

  if (!width) return null;

  const svgCicleTextSize = isMobile ? width * 0.4 : width * 0.12;

  const onBuyTicket = () => {
    window.open(BUY_TICKET_LINK, "_blank");
  };

  return (
    <div className="page-container bg-black">
      <section className="flex flex-col pb-20">
        <div className="w-full relative h-75vh">
          <img
            src={`${BASE_PATH}/png/hero-background@2x.png`}
            alt="The Islanders Arms"
            className="object-cover h-full w-full"
          />
          <div className="absolute h-1/2 w-full top-1/2 left-0 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="hero-content z-10 text-brown-main text-center max-w-5xl mx-auto">
          <h1
            className="px-7 md:px-0 text-4xl md:text-6xl lg:text-6xl xl:text-8xl mb-10 tracking-wider leading-none uppercase"
            style={{ lineHeight: 1.1 }}
          >
            Welcome to an evening with nightwish at The Islanders Arms
          </h1>

          <p className="text-lg px-7 md:px-0 mb-8 leading-relaxed">
            Fri, May 28, 2021
            <br />
            Europe: 9pm EEST (Finland) / 8pm CEST / 7pm BST, duration approx.
            90min
          </p>
          <p className="text-lg px-7 md:px-0 leading-relaxed">
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
        descriptionClassname="text-left mt-4 px-7 md:px-0 md:pl-7"
        titleClassname="px-7 md:px-0 md:pr-7 md:text-right"
        title="Nightwish invites you to a shared adventure at The Islanders Arms, a tavern built in virtual reality."
        center
        description={
          <>
            A full-length live experience of magical dimensions in a virtual
            world The Islander Arms tavern. On both evenings, an unforgettable
            90-minute performance, the songs from the latest album “Human. :II:
            Nature.” will be played live for the first time. The setlist has
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
          className: "mx-auto md:mx-0",
        }}
      />

      <Section
        title="How to get the full VIP experience"
        titleClassname="px-7 md:pl-8 lg:pl-10"
        descriptionClassname="px-7 md:pl-8 lg:pl-10"
        className="pb-10"
        description={
          <>
            The VIP packages include a virtual session with the yet unrevealed
            bass player of Nightwish’s “Human. :II: Nature.” tour, among other
            perks. The identity of the bass player will be revealed on the live
            session included in the VIP package on Friday, May 28, 2021.
          </>
        }
        onClick={() => {
          window.open("https://www.nightwish.com/#tickets", "_blank");
        }}
        buttonText="Get Your VIP Package"
        img={`${BASE_PATH}/png/middle@2x.png`}
      />

      <Section
        title="Chat with other fans. Engage with your friends and meet other fans around the world."
        titleClassname="text-left text-4xl text-center py-7 md:py-0 md:text-left md:text-2xl px-7 md:px-0"
        descriptionClassname="px-7 md:px-0"
        img={`${BASE_PATH}/png/iphone@2x.png`}
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
        titleClassname="px-7 md:pr-8 lg:pr-10 text-center md:text-right"
        title="How to register a ticket and access the event"
        descriptionClassname="px-7 md:pr-8 lg:pr-10 text-center md:text-right"
        description={
          <>
            Registration of purchased tickets is now open! You can register your
            ticket in two ways: by using personal web address or personal ticket
            code. Read more about this on Support Page.
          </>
        }
        onClick={() => router.push("/support")}
        buttonProps={{
          className: "m-auto md:m-none md:float-right",
        }}
        buttonText="FAQ"
        img={`${BASE_PATH}/png/bottom@2x.png`}
      />

      <ReactSVG
        src={`${BASE_PATH}/svg/logo.svg`}
        height={height * (width < 768 ? 0.2 : 0.8)}
        width={width * 0.8}
        className="flex justify-center py-10"
        beforeInjection={(svg) => {
          svg.setAttribute(
            "style",
            `width: ${width * 0.8}px; height: ${
              height * (width < 768 ? 0.2 : 0.8)
            }px;`,
          );
        }}
      />
    </div>
  );
};

export default Home;
