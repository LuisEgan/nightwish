import React, { useEffect, useState } from "react";
import { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import { useRouter } from "next/router";
import Head from "next/head";
import VideoPlayer, { IOnPlayerLoader } from "../../components/VideoPlayer";
import { BASE_PATH, EVENTS_BY_ID, ROUTES } from "../../lib/constants";
import LoadingScreen from "../../components/LoadingScreen";
import EventFeedback from "../../components/Pages/Event/EventFeedback";
import MainEventNotification from "../../components/Pages/Event/MainEventNotification";
import api, { EEventStatus } from "../../api";

// const testUrl =
//   "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8";

const INACTIVITY_SECONDS = 10;

let countdownInterval: NodeJS.Timer;
let countdown = INACTIVITY_SECONDS;

const Event = () => {
  const router = useRouter();
  const { push, query } = router;

  const [loading, setLoading] = useState<boolean>(true);

  const [player, setPlayer] = useState<VideoJsPlayer>();
  const [videoJsOptions, setVideoJsOptions] = useState<VideoJsPlayerOptions>();
  const [eventStatus, setEventStatus] = useState<EEventStatus>();
  const [error, setError] = useState<string>("");

  const [noActivity, setNoActivity] = useState<boolean>(false);

  // * Toggle user activity depending on mouse movement
  useEffect(() => {
    const onMouseMove = () => {
      if (countdown === INACTIVITY_SECONDS) {
        setNoActivity(false);
      }
      countdown = INACTIVITY_SECONDS;
    };
    document.addEventListener("mousemove", onMouseMove, false);

    countdownInterval = setInterval(() => {
      countdown -= 1;
      if (countdown === 0) {
        setNoActivity(true);
      }
    }, 1000);

    return () => {
      document.removeEventListener("mousemove", onMouseMove, false);
      clearInterval(countdownInterval);
    };
  }, []);

  useEffect(() => {
    const searchEventId = window.location.href.match(
      /nightwish\/watch\/([0-9]{1,2})\/?/,
    );
    const eventId = searchEventId ? searchEventId[1] : query?.id;

    if (!eventId) {
      router.replace(ROUTES.PRIVATE_ROUTES.events);
    }

    fetchEventStatusAndURL(eventId as string);

    // eslint-disable-next-line
  }, [query]);

  const fetchEventStatusAndURL = async (id: string) => {
    try {
      const res = await api.getEvent({ eventId: id });

      setEventStatus(res.status);

      if (res?.url) {
        setVideoJsOptions({
          muted: false,
          autoplay: true,
          sources: [
            {
              src: res.url,
              type: "application/x-mpegURL",
            },
          ],
        });
      }

      if (res.status === "pre-waiting") {
        // * If waiting for event to start, refetch every 10 seconds
        setTimeout(() => {
          fetchEventStatusAndURL(id);
        }, 10000);
      } else if (res.status === "post-waiting") {
        // * If waiting for VOD to be available, refetch every 2 minutes
        setTimeout(() => {
          fetchEventStatusAndURL(id);
        }, 1000 * 120);
      }
    } catch (e) {
      console.error("event error: ", e);
      setError(e?.message || e);
    } finally {
      setLoading(false);
    }
  };

  const onPlayerLoaded = ({ player: loadedPlayer }: IOnPlayerLoader) => {
    setPlayer(loadedPlayer);

    setTimeout(() => {
      player?.play();
    }, 1000);
  };

  const onLogoClick = () => {
    push(ROUTES.PRIVATE_ROUTES.events);
  };

  if (
    !loading &&
    (error || (eventStatus !== "live" && eventStatus !== "vod"))
  ) {
    return <EventFeedback {...{ error, eventStatus }} />;
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
        {(!player || loading) && <LoadingScreen />}

        {!noActivity && (
          <div
            className="fadeIn absolute top-10 left-10 z-20 h-11 md:h-16"
            onClick={onLogoClick}
          >
            <img
              className="object-contain cursor-pointer h-full sm:p-2 md:p-0"
              src={`${BASE_PATH}/png/nightwishLogo.png`}
              alt="logo"
            />
          </div>
        )}

        <div className="h-1/2 md:h-full">
          {videoJsOptions && (
            <VideoPlayer {...{ onPlayerLoaded, ...videoJsOptions }} />
          )}
        </div>
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
