import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import tw from "../../../tailwind.config.js";
import { BASE_PATH } from "../../lib/constants";

import styles from "./navbar.module.scss";
import NavbarMenu from "./NavbarMenu";

const Hamburguer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [initClose, setInitClose] = useState<boolean>(false);

  useEffect(() => {
    if (initClose) {
      setTimeout(() => {
        setIsOpen(false);
        setInitClose(false);
      }, 495);
    }
  }, [initClose]);

  return (
    <>
      <div
        id={styles.hamburger}
        className="flex justify-center items-center px-5"
        onClick={() => setIsOpen(true)}
      >
        <ReactSVG
          src={`${BASE_PATH}/svg/hamburger.svg`}
          height={70}
          width={70}
        />
      </div>

      {isOpen && (
        <div className="fixed h-screen w-screen flex z-50">
          <div
            className={`bg-black opacity-60 flex-1 cursor-pointer ${
              initClose ? "fadeOut-60" : "fadeIn-60"
            }`}
            onClick={() => setInitClose(true)}
          />
          <div
            className={`absolute z-50 right-0 h-screen bg-white flex flex-col items-center ${
              initClose ? "slideOutRight" : "slideInRight"
            }`}
            style={{ minWidth: "95%", width: "95%" }}
          >
            <div className="w-full flex justify-end items-stretch justify-items-stretch p-10">
              <ReactSVG
                src={`${BASE_PATH}/svg/x.svg`}
                className="cursor-pointer"
                onClick={() => setInitClose(true)}
                beforeInjection={(svg) => {
                  svg.setAttribute(
                    "style",
                    `width: 5vw; height: 5vw; fill:${tw.theme.extend.colors.brown.main}`,
                  );
                }}
              />
            </div>

            <NavbarMenu mobile onItemClick={() => setInitClose(true)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Hamburguer;
