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
    title: "Log in",
    route: ROUTES.PUBLIC_ROUTES.login,
  },
  {
    title: "Support",
    route: ROUTES.PUBLIC_ROUTES.support,
  },
  {
    title: "Register Your Ticket",
    route: ROUTES.PRIVATE_ROUTES.redeem,
    type: "outline",
  },
];

const loggedInItems = [
  {
    title: "Buy Ticket",
    route: "https://www.nightwish.com/#tickets",
    type: "external",
  },
  {
    title: "Log out",
    route: ROUTES.PUBLIC_ROUTES.login,
    type: "logout",
  },
  {
    title: "Support",
    route: ROUTES.PUBLIC_ROUTES.support,
  },
  {
    title: "Register Your Ticket",
    route: ROUTES.PRIVATE_ROUTES.redeem,
    type: "outline",
  },
];

const NavbarMenu = (props: INavbarMenu) => {
  const { mobile, onItemClick } = props;
  const { isLoggedIn, logout } = useContext(UserContext);
  const { push } = useRouter();
  const [navItems, setNavItems] = useState(loggedOutItems);

  useEffect(() => {
    setNavItems(isLoggedIn ? loggedInItems : loggedOutItems);
  }, [isLoggedIn]);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    if (onItemClick) onItemClick();
    push(ROUTES.PUBLIC_ROUTES.login);
  };

  return (
    <div
      id={mobile ? styles.navBarMobileContainer : styles.navBarItemsContainer}
      className="flex flex-col md:flex-row pr-6"
    >
      {navItems.map((item) => {
        switch (item.type) {
          case "logout":
            return (
              <div key={item.title}>
                <a
                  onClick={handleLogout}
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
                <a href={item.route} target="_blank" rel="noreferrer">
                  {item.title}
                </a>
              </div>
            );
          case "outline":
            return (
              <div key={item.title}>
                <Link href={item.route}>
                  <a className="border bg-transparent border-solid border-brown-main text-brown-main text-center py-3 px-9 rounded-full last:mr-0">
                    {item.title}
                  </a>
                </Link>
              </div>
            );
          default:
            return (
              <div key={item.title}>
                <Link href={item.route}>
                  <a onClick={onItemClick}>{item.title}</a>
                </Link>
              </div>
            );
        }
      })}
    </div>
  );
};

export default NavbarMenu;
