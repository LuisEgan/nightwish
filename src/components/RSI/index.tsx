import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/user/user.context";
import { EVENTS_BY_ID } from "../../lib/constants";

export default function RSI() {
  const { rsi, user, isLoggedIn } = useContext(UserContext);
  const [isActive, setActive] = useState<boolean>(false);

  if (!isLoggedIn || user?.registeredTicketTypes?.length === 0) {
    if (isActive) setActive(false);
    return null;
  }

  Object.keys(EVENTS_BY_ID).forEach((key) => {
    if (
      new Date().getTime() - 1000 * 60 * 30 >
      EVENTS_BY_ID[key].date.getTime()
    ) {
      setActive(true);
    }
  });

  return isActive ? (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        color: "white",
        fontFamily: "SF Mono",
        fontSize: "0.75rem",
        backgroundColor: "black",
      }}
    >
      {rsi}
    </div>
  ) : null;
}
