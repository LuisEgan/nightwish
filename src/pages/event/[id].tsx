import React, { CSSProperties, useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import VideoPlayer, { IOnPlayerLoader } from "../../components/VideoPlayer";
import Chat from "../../components/Chat/indext";
import { useWindowSize } from "../../lib/hooks";

const videoJsOptions: VideoJsPlayerOptions = {
  muted: true,
  sources: [
    {
      src:
        "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
      type: "application/x-mpegURL",
    },
  ],
};

const Event = () => {
  // const { query } = useRouter();

  const { isLandscape } = useWindowSize();

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

  const containerStyle: CSSProperties = isLandscape
    ? { paddingTop: 0, height: "75vh" }
    : {};

  return (
    <div
      className="page-container bg-black h-auto md:h-90vh"
      style={containerStyle}
    >
      <div className="flex flex-col h-screen md:flex-row md:h-full">
        <div className="h-2/5 md:flex-2 md:h-full">
          <VideoPlayer
            {...{ onPlayerLoaded, ...videoJsOptions }}
            className="h-full w-full"
          />
        </div>

        <Chat />
      </div>
    </div>
  );
};

export default Event;
