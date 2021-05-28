import React, { useEffect, useState } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { BASE_PATH } from "../../lib/constants";
import RSI from "../RSI";

// set some global configs
videojs.options.autoplay = true;

export interface IOnPlayerLoader {
  videoNode: HTMLVideoElement;
  player: VideoJsPlayer;
}

interface IVideoPlayer extends VideoJsPlayerOptions {
  onPlayerLoaded?: (params: IOnPlayerLoader) => void;
  fullscreen?: boolean;
  className?: string;
  poster?: string;
}

let videoNode: HTMLVideoElement;

const videoJsOptions: VideoJsPlayerOptions = {
  autoplay: false,
  controls: true,
  liveui: true,
  controlBar: {
    volumePanel: {
      inline: true,
    },

    // progressControl: false,
    playToggle: false,
    captionsButton: false,
    chaptersButton: false,
    subtitlesButton: false,
    remainingTimeDisplay: false,
    playbackRateMenuButton: false,
    currentTimeDisplay: false,
    timeDivider: false,
    durationDisplay: false,
    customControlSpacer: false,
    descriptionsButton: false,
    subsCapsButton: false,
    audioTrackButton: false,
  },
  //   aspectRatio: "640:267",
};

// const handlePlayerError = function (error) {
//   console.error(error);
// };

// const handlePlayerPause = function (event) {
//   this.bigPlayButton.show();
//   // Now the issue is that we need to hide it again if we start playing
//   // So every time we do this, we can create a one-time listener for play events.
//   this.one("play", function () {
//     this.bigPlayButton.hide();
//   });
// };

const VideoPlayer = (props: IVideoPlayer) => {
  const { onPlayerLoaded, fullscreen, className, poster } = props;

  const [player, setPlayer] = useState<VideoJsPlayer>();

  // * Instantiate the player
  useEffect(() => {
    if (player) return null;

    const myPlayer = videojs(
      videoNode,
      { ...videoJsOptions, ...props },
      function onPlayerReady() {
        if (onPlayerLoaded) {
          onPlayerLoaded({ player: this, videoNode });
        }
      },
    );

    // myPlayer.on("error", handlePlayerError);
    // myPlayer.on("pause", handlePlayerPause);
    // myPlayer.on("play", () => console.log("play event")); // @ts-ignore

    setPlayer(myPlayer);

    return () => {
      if (player) {
        player.dispose();
      }
      return null;
    };
  }, [onPlayerLoaded, player, props]);

  return (
    <div
      data-vjs-player
      className={`video-js ${
        fullscreen ? "fixed top-0 h-screen w-screen" : ""
      } ${className}`}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <video
        ref={(node) => {
          videoNode = node;
        }}
        preload="none"
        poster={poster || `${BASE_PATH}/png/nightwishLogo.png`}
      />
      <RSI />
    </div>
  );
};

export default VideoPlayer;
