import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BASE_PATH, EVENTS_BY_ID, ROUTES } from "../../../lib/constants";
import { getDatesDifference } from "../../../lib/dates";

let checkInterval: NodeJS.Timer;

const MILLISECONDS_TO_CHECK_IF_EVENT_STARTED_INTERVAL = 10000;
const MINUTES_BEFORE_EVENT_TO_SHOW_NOTIFICATION = 10;

const MainEventNotification = () => {
  const { query } = useRouter();

  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(20);
  const [isRedirect, setIsRedirect] = useState<boolean>(true);
  const [mainEventId, setMainEventId] = useState<number>();
  const [
    timeBeforeMainEventStarts,
    setTimeBeforeMainEventStarts,
  ] = useState<number>(999);

  // * Get the main event Id
  useEffect(() => {
    if (query?.id) {
      const getMainEventId = +query.id - 10;
      setMainEventId(getMainEventId);
    }
  }, [query]);

  // * Check every 10 seconds after the player loaded
  // * for the main event start to show the notification
  // * Only show in VIP events and 10 mins before the main event
  useEffect(() => {
    if (query?.id && !showNotification && !checkInterval) {
      checkShowNotification(+query.id);
      checkInterval = setInterval(() => {
        checkShowNotification(+query.id);
      }, MILLISECONDS_TO_CHECK_IF_EVENT_STARTED_INTERVAL);
    }

    return () => {
      clearInterval(checkInterval);
    };
  }, [query, showNotification]);

  // * Countdown logic
  useEffect(() => {
    if (!isRedirect || !showNotification) return;

    if (redirectCountdown >= 0) {
      setTimeout(() => setRedirectCountdown(redirectCountdown - 1), 1000);
      return;
    }

    // * Redirect if the countdown gets to 0
    window.location.replace(
      `${BASE_PATH}${ROUTES.PRIVATE_ROUTES.watch}${mainEventId}`,
    );
  }, [redirectCountdown, isRedirect, showNotification, mainEventId]);

  const checkShowNotification = (queryId: number) => {
    // * Get the main event from the VIP ID
    const getMainEventId = queryId - 10;
    const mainEvent = EVENTS_BY_ID[getMainEventId];

    if (mainEvent) {
      const newTimeBeforeMainEventStarts = getDatesDifference({
        date1: mainEvent.date,
        date2: new Date(),
        unit: "minutes",
      });
      setTimeBeforeMainEventStarts(newTimeBeforeMainEventStarts);

      // * Show notification if it starts in N mins or less
      if (
        newTimeBeforeMainEventStarts < MINUTES_BEFORE_EVENT_TO_SHOW_NOTIFICATION
      ) {
        setShowNotification(true);
        clearInterval(checkInterval);
      }
    }
  };

  const onCancelRedirect = () => {
    setIsRedirect(false);
  };

  if (!showNotification) return null;

  return (
    <div className="fixed top-5 z-40 w-screen flex justify-center items-center">
      <div className="w-3/6 rounded-lg border-brown-main border-2 bg-black text-brown-light p-5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="rounded-full h-5 w-5 bg-red-500 mr-2 blink" />
          <span>
            {timeBeforeMainEventStarts < 0
              ? "Main event started!"
              : "Main event is about to start!"}{" "}
          </span>
        </div>

        {redirectCountdown >= 0 && isRedirect ? (
          <div>
            <span>Redirecting you in {redirectCountdown} seconds... </span>
            <span
              className="underline cursor-pointer"
              onClick={onCancelRedirect}
            >
              CANCEL REDIRECT
            </span>
          </div>
        ) : (
          <span
            className="underline cursor-pointer"
            onClick={() =>
              window.location.replace(
                `${BASE_PATH}${ROUTES.PRIVATE_ROUTES.watch}${mainEventId}`,
              )
            }
          >
            Go to main event
          </span>
        )}
      </div>
    </div>
  );
};

export default MainEventNotification;
