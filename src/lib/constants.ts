export const BASE_PATH = "/nightwish";
// export const BASE_PATH = "";

export const ROUTES = {
  PRIVATE_ROUTES: {
    events: "/events",
    watch: "/watch/",
    ticket: "/ticket",
  },

  PUBLIC_ROUTES: {
    index: "/",
    login: "/login",
    legal: "/legal",
    support: "/support",
    register: "/register",
    forgot: "/forgot",
    reset: "/reset",
  },
};

export const API_DNS = (() =>
  typeof window !== "undefined" &&
  window.location.hostname.indexOf("burst.fi") !== -1
    ? "https://api.burst.fi/v1"
    : "https://api.burst-staging.com/v1")();

export const LOCAL_STORAGE = {
  USER_TOKEN: "USER_TOKEN",
  USER: "USER",
};

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const WINDOW_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const BUY_TICKET_LINK = "https://www.nightwish.com/";

export const FRIDAY_CONCERT_DATE = new Date("");

export const EVENTS_BY_ID = {
  1: {
    title: "Friday Main Event",
    listOrder: 2,
    // date: new Date("2021-05-28T17:00:00.000Z"),
    date: new Date("2021-05-26T09:30:00.000Z"),
  },
  2: {
    title: "Saturday Main Event",
    listOrder: 3,
    // date: new Date("2021-05-29T23:00:00.000Z"),
    date: new Date("2021-05-26T11:30:00.000Z"),
  },
  11: {
    title: "Friday VIP Session",
    listOrder: 0,
    // date: new Date("2021-05-21T17:00:00.000Z"),
    // date: new Date("2021-05-28T17:00:00.000Z"),
    date: new Date("2021-05-26T08:30:00.000Z"),
  },
  12: {
    title: "Saturday VIP Session",
    listOrder: 1,
    // date: new Date("2021-05-29T23:00:00.000Z"),
    date: new Date("2021-05-26T10:00:00.000Z"),
  },
};

export const TICKET_TYPES_BY_ID = {
  1: { eventId: [1], events: ["Friday"] },
  2: { eventId: [2], events: ["Saturday"] },
  3: { eventId: [1, 2], events: ["Friday", "Saturday"] },
  4: {
    eventId: [1, 2, 11, 12],
    events: ["Friday", "Saturday", "VIP Friday", "VIP Saturday"],
  },
  5: { eventId: [11, 12], events: ["VIP Friday", "VIP Saturday"] },
  6: {
    eventId: [1, 2, 11, 12],
    events: ["Friday", "Saturday", "VIP Friday", "VIP Saturday"],
  },
  7: { eventId: [11, 12], events: ["VIP Friday", "VIP Saturday"] },
};
