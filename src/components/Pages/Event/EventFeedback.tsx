import Link from "next/link";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { BASE_PATH, ROUTES } from "../../../lib/constants";

import errorAnim from "../../../assets/animations/error.json";
import musicAnim from "../../../assets/animations/musicWaiting.json";
import { EEventStatus } from "../../../api";

interface IEventError {
  error?: string;
  eventStatus: EEventStatus;
}

const EventError = (props: IEventError) => {
  const { error, eventStatus } = props;

  const [message, setMessage] = useState<string>("");
  const [anim, setAnim] = useState();

  useEffect(() => {
    let newMessage = "";
    let newAnim: any = musicAnim;

    switch (eventStatus) {
      case "pre-waiting":
        newMessage = "Event will start shortly";
        break;

      case "post-waiting":
        newMessage = "Your video will soon be ready";
        break;

      default:
        newMessage = "Loading...";
        break;
    }

    if (error) {
      newMessage = error;
      newAnim = errorAnim;
    }

    setMessage(newMessage);
    setAnim(newAnim);
  }, [error, eventStatus]);

  if (!message || !anim) return null;

  return (
    <div className="fixed h-screen w-screen z-50 bg-black flex justify-center items-center px-10 text-center">
      <img
        src={`${BASE_PATH}/jpg/eclipse.jpg`}
        alt="eclipse-background"
        className="absolute object-fill opacity-40"
      />
      <div className="z-10 flex flex-col justify-center items-center text-brown-light">
        <Lottie
          options={{
            autoplay: true,
            animationData: anim,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={170}
          width={170}
          isStopped={false}
          isPaused={false}
        />

        <div className="text-5xl mb-5">{message}</div>
        <div className="text-3xl">
          <Link href={ROUTES.PRIVATE_ROUTES.events}>
            <a className="underline">Return to all events</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventError;
