import { useRouter } from "next/router";
import React, { useContext } from "react";
import Countdown from "react-countdown";
import { UserContext } from "../../../contexts/user/user.context";
import { ROUTES } from "../../../lib/constants";
import Button from "../../Button";

export interface IEventRow {
  eventId: string;
  title: string;
  date: Date;
}
const EventRow = (props: IEventRow) => {
  const { eventId, title, date } = props;

  const { user } = useContext(UserContext);
  const { push } = useRouter();

  const isTicketOwned = user?.eventAccess.includes(+eventId);
  const hoursDiff = Math.abs(date.getTime() - new Date().getTime()) / 36e5;
  const showCountdown = hoursDiff <= 24 && hoursDiff > 0;
  const isTimeToRock = hoursDiff <= 0;

  const setButtonText = () => {
    let txt = "";

    if (isTicketOwned) {
      if (isTimeToRock) {
        txt = "Watch 🤘";
      } else if (showCountdown) {
        txt = "Watch Soon";
      } else {
        txt = "Owned";
      }
    }

    if (!isTicketOwned) {
      if (isTimeToRock) {
        txt = "Closed";
      } else {
        txt = "Buy now";
      }
    }

    return txt;
  };

  const onClick = () => {
    if (isTicketOwned) {
      if (isTimeToRock) {
        // * go to event
        push(`${ROUTES.PRIVATE_ROUTES.event}${eventId}`);
      } else {
        return null;
      }
      return null;
    }

    if (!isTicketOwned) {
      if (isTimeToRock) {
        return null;
      }
      // * go to buy page
      window.open("https://www.nightwish.com/#tickets", "_blank").focus();
    }
    return null;
  };

  return (
    <div
      className={`rounded-3xl border-brown-main border-2 flex flex-col p-10 mt-5 md:flex-row md:items-center ${
        showCountdown ? "bg-brown-main text-black" : "text-brown-main"
      }`}
    >
      <div className="flex-1 mb-5 md:mb-0 md:text-2xl">{title}</div>

      {showCountdown && (
        <div className="text-2xl mb-5 md:mb-0 md:px-10">
          Starts in <Countdown date={date} />
        </div>
      )}

      <Button
        className="md:w-1/5"
        onClick={onClick}
        variant={showCountdown ? "brown" : "primary"}
      >
        {setButtonText()}
      </Button>
    </div>
  );
};

export default EventRow;
