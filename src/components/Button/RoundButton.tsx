import React from "react";
import { ReactSVG } from "react-svg";
import { BASE_PATH } from "../../lib/constants";

interface IRoundButton {
  onClick: () => void;
  className?: string;
  icon?: string;
}

const RoundButton = (props: IRoundButton) => {
  const { onClick, className, icon = `${BASE_PATH}/svg/check.svg` } = props;

  return (
    <div
      className={`${className} flex justify-center items-center h-14 w-14 ml-3 rounded-full bg-brown-main cursor-pointer`}
      onClick={onClick}
    >
      <ReactSVG
        src={icon}
        height={20}
        width={20}
        beforeInjection={(svg) => {
          svg.setAttribute("style", `width: ${30}px; height: ${30}px;`);
        }}
      />
    </div>
  );
};

export default RoundButton;
