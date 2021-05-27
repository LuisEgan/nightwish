import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ROUTES } from "../../lib/constants";
import { UserContext } from "../../contexts/user/user.context";

import styles from "./navbar.module.scss";

interface INavbarMenu {
  mobile?: boolean;
  onItemClick?: () => void;
}

const loggedOutItems = [
  {
    title: "Buy Ticket",
    route: "https://www.nightwish.com/#tickets",
    type: "external",
  },
  {
    title: "Support",
    route: ROUTES.PUBLIC_ROUTES.support,
  },
  {
    title: "Log in",
    route: ROUTES.PUBLIC_ROUTES.login,
  },
  {
    title: "Register Your Ticket",
    route: ROUTES.PUBLIC_ROUTES.register,
    type: "outline",
    firstOnMobile: true,
  },
];

const loggedInItems = [
  {
    title: "Buy Ticket",
    route: "https://www.nightwish.com/#tickets",
    type: "external",
  },
  {
    title: "Support",
    route: ROUTES.PUBLIC_ROUTES.support,
  },
  {
    title: "Log out",
    route: ROUTES.PUBLIC_ROUTES.login,
    type: "logout",
  },
  {
    title: "Register Your Ticket",
    route: ROUTES.PRIVATE_ROUTES.ticket,
    type: "outline",
    firstOnMobile: true,
  },
];

const loggedInAndHasTicketsItems = [
  {
    title: "Buy Ticket",
    route: "https://www.nightwish.com/#tickets",
    type: "external",
  },
  {
    title: "Support",
    route: ROUTES.PUBLIC_ROUTES.support,
  },
  {
    title: "Log out",
    route: ROUTES.PUBLIC_ROUTES.login,
    type: "logout",
  },
  {
    title: "Watch",
    route: ROUTES.PRIVATE_ROUTES.events,
    type: "solid",
    firstOnMobile: true,
  },
];

const NavbarMenu = (props: INavbarMenu) => {
  const { mobile, onItemClick } = props;
  const { isLoggedIn, user, logout } = useContext(UserContext);
  const { push } = useRouter();
  const [navItems, setNavItems] = useState(loggedOutItems);

  useEffect(() => {
    setNavItems(
      (isLoggedIn
        ? user && user.eventAccess && user.eventAccess.length > 0
          ? loggedInAndHasTicketsItems
          : loggedInItems
        : loggedOutItems
      ).sort((a, b) =>
        a.firstOnMobile && a.firstOnMobile !== b.firstOnMobile ? -1 : 1,
      ),
    );
  }, [isLoggedIn, user]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    if (onItemClick) onItemClick();
    push(ROUTES.PUBLIC_ROUTES.index);
  };

  return (
    <div
      id={mobile ? styles.navBarMobileContainer : styles.navBarItemsContainer}
      className={`flex flex-col md:flex-row pr-10 ${
        mobile ? "w-full px-10" : ""
      }`}
    >
      {navItems.map((item) => {
        switch (item.type) {
          case "logout":
            return (
              <div key={item.title}>
                <a
                  onClick={handleLogout}
                  className={`text-brown-main ${mobile ? "text-2xl px-7" : ""}`}
                  href={item.route}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
              </div>
            );
          case "external":
            return (
              <div key={item.title}>
                <a
                  href={item.route}
                  onClick={onItemClick}
                  className={`text-brown-main ${mobile ? "text-2xl px-7" : ""}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
              </div>
            );
          case "outline":
            return (
              <div key={item.title}>
                <Link href={item.route}>
                  <a
                    className={`link-outline border border-solid border-brown-main text-brown-main text-center rounded-full last:mr-0 ${
                      mobile ? "text-2xl py-4 px-6" : "py-3 px-9"
                    }`}
                    onClick={onItemClick}
                  >
                    {item.title}
                  </a>
                </Link>
              </div>
            );
          case "solid":
            return (
              <div key={item.title}>
                <Link href={item.route}>
                  <a
                    onClick={onItemClick}
                    className={`link-solid border border-solid border-brown-main bg-brown-main text-black text-center rounded-full text-black last:mr-0 ${
                      mobile ? "text-2xl py-3 px-12" : "py-3 px-9"
                    }`}
                  >
                    {item.title}
                  </a>
                </Link>
              </div>
            );
          default:
            return (
              <div key={item.title}>
                <Link href={item.route}>
                  <a
                    onClick={onItemClick}
                    className={`text-brown-main ${
                      mobile ? "text-2xl px-7" : ""
                    }`}
                  >
                    {item.title}
                  </a>
                </Link>
              </div>
            );
        }
      })}
    </div>
  );
};

export default NavbarMenu;
