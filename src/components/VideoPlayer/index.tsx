import React, { useEffect, useState } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";

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

const VideoPlayer = (props: IVideoPlayer) => {
  const { onPlayerLoaded, fullscreen, className, poster } = props;

  const [player, setPlayer] = useState<VideoJsPlayer>();

  // * Instantiate the player
  useEffect(() => {
    if (player) return null;

    setPlayer(
      videojs(
        videoNode,
        { ...videoJsOptions, ...props },
        function onPlayerReady() {
          if (onPlayerLoaded) {
            onPlayerLoaded({ player: this, videoNode });
          }
        },
      ),
    );

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
        poster={poster || "/nightwish/png/nightwishLogo.png"}
      />
    </div>
  );
};

export default VideoPlayer;
