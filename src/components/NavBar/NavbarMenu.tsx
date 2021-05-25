import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ROUTES } from "../../lib/constants";
import { UserContext } from "../../contexts/user/user.context";

import Button from "../Button";
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

  const registerTicket = () => {
    if (onItemClick) onItemClick();
    push(ROUTES.PRIVATE_ROUTES.events);
  };

  return (
    <div
      id={mobile ? styles.navBarMobileContainer : styles.navBarItemsContainer}
      className="flex flex-col md:flex-row"
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

      <div>
        {isLoggedIn ? (
          <Button outline>Log out</Button>
        ) : (
          <Button outline onClick={registerTicket}>
            Register Your Ticket
          </Button>
        )}
      </div>
    </div>
  );
};

export default NavbarMenu;
