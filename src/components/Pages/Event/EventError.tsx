import Link from "next/link";
import React from "react";
import Lottie from "react-lottie";
import { ROUTES } from "../../../lib/constants";

import errorAnim from "../../../assets/animations/error.json";

interface IEventError {
  error: string;
}

const EventError = (props: IEventError) => {
  const { error } = props;

  return (
    <div className="fixed h-screen w-screen z-50 bg-black flex justify-center items-center">
      <div className="flex flex-col justify-center items-center text-brown-light">
        <Lottie
          options={{
            autoplay: true,
            animationData: errorAnim,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={140}
          width={140}
          isStopped={false}
          isPaused={false}
        />

        <div className="text-5xl mb-5">{error}</div>
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
