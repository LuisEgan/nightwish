import React, { useContext } from "react";
import Link from "next/link";
import { ReactSVG } from "react-svg";
import { UserContext } from "../../contexts/user/user.context";
import { ROUTES } from "../../lib/constants";

const links = [
  { route: "luppi.fi", title: "Buy tickets", newTab: true },
  { route: ROUTES.PUBLIC_ROUTES.support, title: "Support" },
  { route: ROUTES.PRIVATE_ROUTES.events, title: "Redeem ticket" },
];

const socialNetworkLinks = [
  { link: "https://www.instagram.com/nightwish", icon: "/svg/instagram.svg" },
  { link: "https://www.facebook.com/nightwish/", icon: "/svg/facebook.svg" },
  { link: "https://twitter.com/NightwishBand", icon: "/svg/twitter.svg" },
  {
    link: "https://www.youtube.com/channel/UCQplaZZ2mv8fo8Zd-1hQPzg",
    icon: "/svg/youtube.svg",
  },
  {
    link:
      "https://open.spotify.com/artist/2NPduAUeLVsfIauhRwuft1?si=P_b0Qe5SQEavH4JsqCeIgA&nd=1",
    icon: "/svg/spotify.svg",
  },
  {
    link: "https://music.apple.com/cl/artist/nightwish/2898807?uo=4&app=music",
    icon: "/svg/apple.svg",
  },
  {
    link: "https://www.contrapromotion.com/en/artists/nightwish/",
    icon: "/svg/boarding-pass.svg",
  },
  {
    link: "https://www.backstagerockshop.com/collections/nightwish",
    icon: "/svg/shopping-cart.svg",
  },
];

const Footer = () => {
  const { isLoggedIn } = useContext(UserContext);

  const setItems = () => {
    const items = [...links];

    if (isLoggedIn) {
      items.push({
        route: ROUTES.PRIVATE_ROUTES.events,
        title: "Events",
      });
    } else {
      items.push({ route: ROUTES.PUBLIC_ROUTES.login, title: "Sign in" });
    }

    return [];
  };

  const items = setItems();

  return (
    <footer className="text-brown-main bg-black py-10 px-7 md:px-20">
      <div className="flex-col md:flex md:flex-row">
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

        {/* <div className="py-5 flex justify-end">
          <Link href={ROUTES.PUBLIC_ROUTES.terms}>
            <a>Privacy Policy and Terms</a>
          </Link>
        </div> */}
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
          <span className="text-sm">All Rights Reserved © 2021</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
