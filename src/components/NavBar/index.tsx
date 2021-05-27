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

  if (pathname === `${ROUTES.PRIVATE_ROUTES.watch}[id]`) {
    return null;
  }

  return (
    <div className="h-24 md:h-24 lg:h-28">
      <div
        className="relative lg:fixed w-full h-24 md:h-24 lg:h-28 flex justify-between z-20 bg-black"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
      >
        <Link href="/">
          <a className={`py-7 ${isMobile ? "pl-6" : ""}`}>
            <img
              style={{ height: "100%" }}
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
