import React, { useContext } from "react";
import Link from "next/link";
// import { useRouter } from "next/router";
import { ROUTES } from "../../lib/constants";
// import Button from "../Button";

import styles from "./navbar.module.scss";
import { UserContext } from "../../contexts/user/user.context";

interface INavbarMenu {
  mobile?: boolean;
  onItemClick?: () => void;
}

const staticItems = [
  { route: "luppi.fi", title: "Buy tickets", newTab: true },
  { route: ROUTES.PUBLIC_ROUTES.support, title: "Support" },
];

const NavbarMenu = (props: INavbarMenu) => {
  const { mobile, onItemClick } = props;

  const { isLoggedIn } = useContext(UserContext);

  // const { push } = useRouter();

  // const redeemTicket = () => {
  //   if (onItemClick) onItemClick();

  //   push(ROUTES.PRIVATE_ROUTES.events);
  // };

  // const onLogout = () => {
  //   logout();
  //   push(ROUTES.PUBLIC_ROUTES.login);
  // };

  const setItems = () => {
    const items = [...staticItems];

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

  return (
    <div
      id={mobile ? styles.navBarMobileContainer : styles.navBarItemsContainer}
      className="flex flex-col md:flex-row"
    >
      {setItems().map((item) => (
        <div key={item.title}>
          {item.newTab ? (
            <a href={item.route} target="__blank">
              {item.title}
            </a>
          ) : (
            <Link href={item.route}>
              <a
                onClick={() => {
                  if (onItemClick) onItemClick();
                }}
              >
                {item.title}
              </a>
            </Link>
          )}
        </div>
      ))}

      {/* <div>
        <Button outline onClick={isLoggedIn ? onLogout : redeemTicket}>
          {isLoggedIn ? "Logout" : "Redeem"}
        </Button>
      </div> */}
    </div>
  );
};

export default NavbarMenu;
