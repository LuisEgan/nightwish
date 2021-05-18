import React from "react";
import { useRouter } from "next/router";
import NavbarMenu from "./NavbarMenu";
import { useWindowSize } from "../../lib/hooks";
import Hamburger from "./Hamburger";
import { ROUTES } from "../../lib/constants";

export const NAVBAR_HEIGHT_CLASS = "h-20";

const NavBar = () => {
  const { pathname, push } = useRouter();

  const { isMobile } = useWindowSize();

  if (pathname === `${ROUTES.PRIVATE_ROUTES.event}[id]`) {
    return null;
  }

  const onLogoClick = () => {
    push(ROUTES.PUBLIC_ROUTES.index);
  };

  return (
    <div
      className={`${NAVBAR_HEIGHT_CLASS} fixed w-full flex justify-between z-10 bg-black opacity-80`}
    >
      <div className="h-full w-3/5 px-5 md:w-1/4 md:py-4">
        <div
          className="w-full h-full flex justify-center"
          onClick={onLogoClick}
        >
          <img
            className="m-auto object-contain cursor-pointer h-full sm:p-2 md:p-0"
            src="/png/nightwishLogo.png"
            alt="logo"
          />
        </div>
      </div>

      {isMobile ? <Hamburger /> : <NavbarMenu />}
    </div>
  );
};

export default NavBar;
