import React, { useEffect, useState } from "react";
import { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { useRouter } from "next/router";
import Head from "next/head";
import VideoPlayer, { IOnPlayerLoader } from "../../components/VideoPlayer";
import Chat from "../../components/Chat";
import { BASE_PATH, EVENTS_BY_ID, ROUTES } from "../../lib/constants";
import LoadingScreen from "../../components/LoadingScreen";
import EventError from "../../components/Pages/Event/EventError";
import MainEventNotification from "../../components/Pages/Event/MainEventNotification";
import api from "../../api";

// const testUrl =
//   "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8";

const Event = () => {
  const router = useRouter();
  const { push, query } = router;

  const [player, setPlayer] = useState<VideoJsPlayer>();
  const [videoJsOptions, setVideoJsOptions] = useState<VideoJsPlayerOptions>();
  const [eventError, setEventError] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);

  useEffect(() => {
    const fetchEventPlaylistURL = async (id: string) => {
      try {
        const res = await api.getEvent({ eventId: id });

        // * Render chat only on live events
        setShowChat(res.live);

        setVideoJsOptions({
          muted: true,
          autoplay: true,
          sources: [
            {
              src: res.url,
              type: "application/x-mpegURL",
            },
          ],
        });
      } catch (error) {
        console.error("event error: ", error);
        setEventError(error?.message || error);
      }
    };

    if (query?.id) {
      if (
        new Date().getTime() - 1000 * 60 * 61 <
        EVENTS_BY_ID[String(query.id)].date.getTime()
      ) {
        router.replace(ROUTES.PRIVATE_ROUTES.events);
        return;
      }
      fetchEventPlaylistURL(query.id as string);
    }
  }, [query]);

  const onPlayerLoaded = ({ player: loadedPlayer }: IOnPlayerLoader) => {
    setPlayer(loadedPlayer);

    setTimeout(() => {
      player?.play();
    }, 1000);
  };

  const onLogoClick = () => {
    push(ROUTES.PRIVATE_ROUTES.events);
  };

  if (eventError) {
    return <EventError error={eventError} />;
  }

  return (
    <>
      <Head>
        {typeof window !== "undefined" && (
          <script
            type="application/javascript"
            src="https://cdn.strivetech.io/services/storage/v0/entity-resource/1385164721045188608/1385165007474208768/gwc.min.js"
          />
        )}
      </Head>

      <MainEventNotification />

      <div className="relative h-screen w-screen p-5 bg-black">
        {!player && <LoadingScreen />}

        <div
          className="absolute top-10 left-10 z-20 h-11 md:h-16 opacity-40 hover:opacity-100"
          onClick={onLogoClick}
        >
          <img
            className="object-contain cursor-pointer h-full sm:p-2 md:p-0"
            src={`${BASE_PATH}/png/nightwishLogo.png`}
            alt="logo"
          />
        </div>

        <div className="h-1/2 md:h-full">
          {videoJsOptions && (
            <VideoPlayer {...{ onPlayerLoaded, ...videoJsOptions }} />
          )}
        </div>

        {showChat && <Chat />}
      </div>
    </>
  );
};

export async function getStaticProps() {
  return { props: {} };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(EVENTS_BY_ID).map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
}

export default Event;
