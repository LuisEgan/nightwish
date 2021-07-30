import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import PrivateRoute from "../components/Auth/PrivateRoute";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import { IRoute, RouteLayout } from "./types";
import { useRouter } from "next/router";

type IRoutes = {
  PRIVATE: {
    [route in keyof typeof PRIVATE_ROUTES]: IRoute;
  };
  PUBLIC: {
    [route in keyof typeof PUBLIC_ROUTES]: IRoute;
  };
};

const ROUTES: IRoutes = {
  PRIVATE: PRIVATE_ROUTES,
  PUBLIC: PUBLIC_ROUTES,
};

const Routes = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const privatePaths = Object.keys(ROUTES.PRIVATE);

  return (
    <>
      {privatePaths.includes(router.pathname) ? (
        <PrivateRoute>
          <RouteLayout Layout={ROUTES.PRIVATE[router.pathname].Layout}>
            <Component {...pageProps} />
          </RouteLayout>
        </PrivateRoute>
      ) : (
        <RouteLayout Layout={ROUTES.PUBLIC[router.pathname]?.Layout}>
          <Component {...pageProps} />
        </RouteLayout>
      )}
    </>
  );
};

export default Routes;
