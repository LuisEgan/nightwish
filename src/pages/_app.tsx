import React, { useEffect } from "react";
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

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);
    if (accessToken) {
      setAxiosAuthorizationHeader(accessToken);
    }
  }, []);

  const privateRoutes = Object.keys(ROUTES.PRIVATE_ROUTES).map((r) => {
    if (`/${r}/` === ROUTES.PRIVATE_ROUTES.event) {
      return `${ROUTES.PRIVATE_ROUTES[r]}[id]`;
    }

    return ROUTES.PRIVATE_ROUTES[r];
  });

  return (
    <UserProvider>
      <Head>
        <title>Nightwish</title>
        <link rel="icon" href={`${BASE_PATH}/favicon.ico`} />
      </Head>

      <NavBar />

      {privateRoutes.includes(router.pathname) ? (
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      ) : (
        <Component {...pageProps} />
      )}

      <Footer />
    </UserProvider>
  );
};

export default App;
