import React, { useEffect, useState } from "react";
import { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { useRouter } from "next/router";
import VideoPlayer, { IOnPlayerLoader } from "../../components/VideoPlayer";
import Chat from "../../components/Chat";
import { ROUTES } from "../../lib/constants";

const videoJsOptions: VideoJsPlayerOptions = {
  muted: true,
  // fluid: true,
  sources: [
    {
      src:
        "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
      type: "application/x-mpegURL",
    },
  ],
};

const Event = () => {
  const { push } = useRouter();

  const [, setPlayer] = useState<VideoJsPlayer>();

  useEffect(() => {
    (async () => {
      try {
        // await document.documentElement.requestFullscreen();fd
        // await window.screen.orientation.lock("landscape");
        // const { type } = window.screen.orientation;
      } catch (error) {
        console.error("error: ", error);
      }
    })();
  }, []);

  const onPlayerLoaded = ({ player }: IOnPlayerLoader) => {
    setPlayer(player);

    setTimeout(() => {
      player.play();
    }, 1000);
  };

  const onLogoClick = () => {
    push(ROUTES.PRIVATE_ROUTES.events);
  };

  return (
    <div className="relative h-screen w-screen p-5 bg-black">
      <div
        className="absolute top-10 left-10 z-20 h-11 md:h-16 opacity-40 hover:opacity-100"
        onClick={onLogoClick}
      >
        <img
          className="object-contain cursor-pointer h-full sm:p-2 md:p-0"
          src="/nightwish/png/nightwishLogo.png"
          alt="logo"
        />
      </div>

      <div className="h-1/2 md:h-full">
        <VideoPlayer {...{ onPlayerLoaded, ...videoJsOptions }} />
      </div>

      <Chat />
    </div>
  );
};

export default Event;
