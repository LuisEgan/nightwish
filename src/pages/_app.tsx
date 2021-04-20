import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/globals.scss";
import { ROUTES } from "../lib/constants";
import PrivateRoute from "../components/Auth/PrivateRoute";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const privateRoutes = Object.keys(ROUTES.PRIVATE_ROUTES).map(
    (r) => ROUTES.PRIVATE_ROUTES[r]
  );

  return (
    <>
      <Head>
        <title>Nightwish</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {privateRoutes.includes(router.pathname) ? (
        <PrivateRoute>
          <Component {...pageProps} />
        </PrivateRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
};

export default App;
