import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { BASE_PATH, LOCAL_STORAGE, ROUTES } from "../lib/constants";
import PrivateRoute from "../components/Auth/PrivateRoute";

import UserProvider from "../contexts/user/user.provider";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import { setAxiosAuthorizationHeader } from "../api";

import "video.js/src/css/vjs.scss";
import "../styles/globals.scss";
import "../styles/animations.scss";
import "../styles/accordion.scss";

import Chat from "../components/Chat";
import RSI from "../components/RSI";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const [isChrome, setIsChrome] = useState(
    typeof window !== "undefined" &&
      window.navigator.userAgent.indexOf("Chrome") !== -1,
  );

  useEffect(() => {
    if (window) {
      setIsChrome(window.navigator.userAgent.indexOf("Chrome") !== -1);
    }
    const accessToken = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
    if (accessToken) {
      setAxiosAuthorizationHeader(accessToken);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    function gtag(...args) {
      // @ts-ignore
      dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-3RN2GR3X75");
  }, []);

  const privateRoutes = Object.keys(ROUTES.PRIVATE_ROUTES).map((r) => {
    if (`/${r}/` === ROUTES.PRIVATE_ROUTES.watch) {
      return `${ROUTES.PRIVATE_ROUTES[r]}[id]`;
    }

    return ROUTES.PRIVATE_ROUTES[r];
  });

  return (
    <UserProvider>
      <Head>
        <title>Nightwish</title>
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
        {/* <script
          src="//rum-static.pingdom.net/pa-60afb0dc3a9c8c0011000100.js"
          async
        /> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3RN2GR3X75"
        />
      </Head>
      <div id="website" className={isChrome ? "isChrome" : ""}>
        <NavBar />
        {privateRoutes.includes(router.pathname) ? (
          <PrivateRoute>
            <Component {...pageProps} />
          </PrivateRoute>
        ) : (
          <Component {...pageProps} />
        )}

        <Chat />
        <Footer />
        <RSI />
      </div>
    </UserProvider>
  );
};

export default App;
