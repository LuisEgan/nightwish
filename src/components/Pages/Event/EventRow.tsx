import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

import { UserContext } from "../../../contexts/user/user.context";
import { ROUTES } from "../../../lib/constants";
import Button from "../../Button";
import { getDatesDifference } from "../../../lib/dates";

dayjs.extend(relativeTime);

export interface IEventRow {
  eventId: string;
  title: string;
  date: Date;
  small?: boolean;
}
const EventRow = (props: IEventRow) => {
  const { eventId, title, date, small } = props;

  const { user } = useContext(UserContext);
  const { push } = useRouter();

  const isTicketOwned = user?.eventAccess.includes(+eventId);
  const [isOwned, setIsOwned] = useState(isTicketOwned);

  const hoursDiff = getDatesDifference({
    date1: date,
    date2: new Date(),
    unit: "hours",
  });
  const isWithin24Hours = hoursDiff > 0 && hoursDiff <= 24;
  const eventHappened = hoursDiff < 0;
  const eventHappenedLessThan6HoursAgo = hoursDiff >= -6;
  const isTimeToRock = hoursDiff <= 1;

  useEffect(() => {
    if (!user) return;
    setIsOwned(user.eventAccess.includes(+eventId));
  }, [user, eventId]);

  const setButtonText = () => {
    let txt = "";

    if (isTicketOwned) {
      if (isTimeToRock) {
        txt = "Go watch!";
      } else {
        txt = "You own this";
      }
    }

    if (!isTicketOwned) {
      txt = "Buy Ticket";
    }

    return txt;
  };

  const onClick = () => {
    if (isTicketOwned) {
      if (isTimeToRock) {
        // * go to event
        push(`${ROUTES.PRIVATE_ROUTES.watch}${eventId}`);
      } else {
        return null;
      }
      return null;
    }

    if (!isTicketOwned) {
      // * go to buy page
      window.open("https://www.nightwish.com/#tickets", "_blank").focus();
    }
    return null;
  };

  return (
    <div
      className={`rounded-3xl border-brown-main border-2 flex flex-col mt-5 md:flex-row md:items-center ${
        isWithin24Hours || (eventHappened && eventHappenedLessThan6HoursAgo)
          ? "bg-brown-main text-black"
          : "text-brown-main"
      } ${small ? "px-10 py-8" : "px-10 py-10"}`}
    >
      <div className="flex-1 mb-5 md:mb-0 md:text-2xl">
        {title}
        <div className="text-lg">{dayjs(date).format("dddd h:mm a")}</div>
      </div>

      <div className="text-2xl mb-5 md:mb-0 md:px-10">
        {eventHappened ? "Started" : "Starts"} {dayjs().to(dayjs(date))}
      </div>

      <Button
        className="md:w-1/5"
        onClick={onClick}
        variant={
          isWithin24Hours
            ? isTimeToRock && isOwned
              ? "orange"
              : "brown"
            : "primary"
        }
        outline={!isOwned}
      >
        {setButtonText()}
      </Button>
    </div>
  );
};

export default EventRow;
