import React, { FC, ComponentType } from "react";

const DefaultLayout = () => <div></div>;

interface IRouteLayout {
  Layout: ComponentType;
}
export const RouteLayout: FC<IRouteLayout> = (props) => {
  const { children } = props;
  let { Layout } = props;

  Layout = Layout || DefaultLayout;

  return <Layout>{children}</Layout>;
};

export interface IRoute {
  path: string;
  Layout?: ComponentType;
}
