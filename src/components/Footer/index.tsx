import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { UserContext } from "../../contexts/user/user.context";
import { BASE_PATH, ROUTES } from "../../lib/constants";

const links = [
  { route: "https://www.nightwish.com/", title: "Buy Ticket", newTab: true },
  { route: ROUTES.PUBLIC_ROUTES.support, title: "Support" },
  { route: ROUTES.PRIVATE_ROUTES.ticket, title: "Register your ticket" },
];

const socialNetworkLinks = [
  {
    link: "https://www.instagram.com/nightwish",
    icon: `${BASE_PATH}/svg/instagram.svg`,
  },
  {
    link: "https://www.facebook.com/nightwish/",
    icon: `${BASE_PATH}/svg/facebook.svg`,
  },
  {
    link: "https://twitter.com/NightwishBand",
    icon: `${BASE_PATH}/svg/twitter.svg`,
  },
  {
    link: "https://www.youtube.com/channel/UCQplaZZ2mv8fo8Zd-1hQPzg",
    icon: `${BASE_PATH}/svg/youtube.svg`,
  },
  {
    link:
      "https://open.spotify.com/artist/2NPduAUeLVsfIauhRwuft1?si=P_b0Qe5SQEavH4JsqCeIgA&nd=1",
    icon: `${BASE_PATH}/svg/spotify.svg`,
  },
  {
    link: "https://music.apple.com/cl/artist/nightwish/2898807?uo=4&app=music",
    icon: `${BASE_PATH}/svg/apple.svg`,
  },
  {
    link: "https://www.contrapromotion.com/en/artists/nightwish/",
    icon: `${BASE_PATH}/svg/boarding-pass.svg`,
  },
  {
    link: "https://www.backstagerockshop.com/collections/nightwish",
    icon: `${BASE_PATH}/svg/shopping-cart.svg`,
  },
];

const Footer = () => {
  const { isLoggedIn } = useContext(UserContext);

  const { pathname } = useRouter();

  const setItems = () => {
    const items = [...links];

    if (isLoggedIn) {
      items.push({
        route: ROUTES.PRIVATE_ROUTES.events,
        title: "Events",
      });
    }

    return items;
  };

  if (pathname === `${ROUTES.PRIVATE_ROUTES.watch}[id]`) {
    return null;
  }

  const items = setItems();

  return (
    <footer className="text-brown-main bg-black py-10 px-7 md:px-20">
      <div className="flex flex-col md:flex-row">
        <div className="grid grid-cols-2 md:grid-cols-4 md:flex-1">
          {items.map(({ route, title, newTab }, index) => {
            const isLastLink = index === items.length - 1;

            return (
              <div
                key={title}
                className={`py-1 flex items-center ${
                  index < 2 ? "col-span-2 md:col-span-1" : ""
                } ${isLastLink ? "justify-end md:justify-start" : ""}`}
              >
                {newTab ? (
                  <a href={route} target="__blank">
                    {title}
                  </a>
                ) : (
                  <Link href={route}>
                    <a>{title}</a>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="py-5 flex justify-end flex-1">
          <a
            href="https://privacy.zoan.fi/burst-live/"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy and Terms
          </a>
        </div>
      </div>

      <div className="md:flex md:flex-row-reverse">
        <div className="flex flex-1 justify-between items-center">
          {socialNetworkLinks.map(({ icon, link }) => (
            <a key={link} href={link} target="__blank">
              <ReactSVG
                src={icon}
                height={20}
                width={20}
                beforeInjection={(svg) => {
                  svg.setAttribute("style", `width: ${20}px; height: ${20}px;`);
                }}
              />
            </a>
          ))}
        </div>

        <div className="py-3 flex-2">
          <span className="text-sm">All Rights Reserved ?? 2021</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
