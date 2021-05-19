import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AppProps } from "next/dist/next-server/lib/router/router";
import Amplify from "@aws-amplify/core";
// import awsExports from "../aws-exports.js";

import { ROUTES } from "../lib/constants";
import PrivateRoute from "../components/Auth/PrivateRoute";

import UserProvider from "../contexts/user/user.provider";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

import "video.js/src/css/vjs.scss";
import "../styles/globals.scss";
import "../styles/animations.scss";
import "../styles/accordion.scss";

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

Amplify.configure({
  aws_project_region: "eu-central-1",
  aws_appsync_graphqlEndpoint:
    "https://4oqkubczavgfdcjeh43sxpnwyy.appsync-api.eu-central-1.amazonaws.com/graphql",
  aws_appsync_region: "eu-central-1",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-rpq2tnlx35dtvf3d3uoqyk4u2y",
});
export default App;
