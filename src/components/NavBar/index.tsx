import React from "react";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/router";
import NavbarMenu from "./NavbarMenu";
import { useWindowSize } from "../../lib/hooks";
import Hamburger from "./Hamburger";
import { ROUTES } from "../../lib/constants";

export const NAVBAR_HEIGHT_CLASS = "h-20";

const NavBar = () => {
  const { pathname } = useRouter();

  const { isMobile, isLandscape } = useWindowSize();

  if (
    isMobile &&
    isLandscape &&
    pathname === `${ROUTES.PRIVATE_ROUTES.event}[id]`
  ) {
    return null;
  }

  return (
    <div
      className={`${NAVBAR_HEIGHT_CLASS} fixed w-full flex justify-between z-10 bg-black`}
    >
      <div className="h-full w-2/5 px-5 md:w-1/4 md:py-4">
        <div className="w-full h-full relative">
          <Link href={ROUTES.PUBLIC_ROUTES.index}>
            <a>
              <Image
                src="/png/nightwishLogo.png"
                layout="fill"
                objectFit="contain"
                alt="logo"
              />
            </a>
          </Link>
        </div>
      </div>

      {isMobile ? <Hamburger /> : <NavbarMenu />}
    </div>
  );
};

export default NavBar;
