export const ROUTES = {
  PRIVATE_ROUTES: {
    events: "/event/all",
    event: "/event/",
  },

  PUBLIC_ROUTES: {
    index: "/",
    login: "/login",
    terms: "/terms",
    support: "/support",
  },
};

export const LOCAL_STORAGE = {
  USER_TOKEN: "USER_TOKEN",
  USER: "USER",
};

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const WINDOW_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const BUY_TICKET_LINK = "https://www.nightwish.com/";
