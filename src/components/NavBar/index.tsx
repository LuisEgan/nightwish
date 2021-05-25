import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NavbarMenu from "./NavbarMenu";
import { useWindowSize } from "../../lib/hooks";
import Hamburger from "./Hamburger";
import { BASE_PATH, ROUTES } from "../../lib/constants";

const NavBar = () => {
  const { pathname } = useRouter();

  const { isMobile } = useWindowSize();

  if (pathname === `${ROUTES.PRIVATE_ROUTES.event}[id]`) {
    return null;
  }

  return (
    <div className="h-28 md:h-32">
      <div
        className="fixed w-full h-28 md:h-32 flex justify-between z-20 bg-black py-7"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      >
        <Link href="/">
          <a className="flex justify-center pl-12">
            <img
              className="md:max-h-20 max-h-16 h-auto w-auto border-none"
              src={`${BASE_PATH}/png/nw-logo.png`}
              alt="Nightwish"
            />
          </a>
        </Link>

        {isMobile ? <Hamburger /> : <NavbarMenu />}
      </div>
    </div>
  );
};

export default NavBar;
