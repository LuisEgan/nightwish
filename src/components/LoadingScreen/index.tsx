import React from "react";
import Lottie from "react-lottie";

import musicLoading from "../../assets/animations/musicLoading.json";

const LoadingScreen = () => (
  <div className="fixed bg-black h-screen w-screen z-50 top-0 left-0 flex justify-center items-center">
    <div className="flex flex-col">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: musicLoading,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={140}
        width={140}
        isStopped={false}
        isPaused={false}
      />

      <div className="text-5xl font-bold py-10 text-brown-light">
        Loading...
      </div>
    </div>
  </div>
);

export default LoadingScreen;
