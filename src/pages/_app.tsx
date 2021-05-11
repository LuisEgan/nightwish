import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import { useRouter } from "next/router";
import { ROUTES } from "../lib/constants";
import PrivateRoute from "../components/Auth/PrivateRoute";

import UserProvider from "../contexts/user/user.provider";

import "video.js/src/css/vjs.scss";
import "../styles/globals.scss";
import "../styles/animations.scss";
import "../styles/accordion.scss";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

// import "animate.css/animate.min.css";
// import "../styles/videojs.scss";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

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
        <link rel="icon" href="/favicon.ico" />
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
