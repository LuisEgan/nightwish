const Layout = () => <></>;

export const PRIVATE_ROUTES = {
  events: { path: "/events", Layout: () => <Layout /> },
  watch: { path: "/events/watch" },
  ticket: { path: "/event/ticket/[id]", Layout: () => <Layout /> },
};

export const PUBLIC_ROUTES = {
  index: { path: "/", Layout: () => <Layout /> },
  login: { path: "/login", Layout: () => <Layout /> },
};
