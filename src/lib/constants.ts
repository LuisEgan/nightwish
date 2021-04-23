export const ROUTES = {
  PRIVATE_ROUTES: {
    events: "/events",
    event: "/event",
  },

  PUBLIC_ROUTES: {
    index: "/",
    buyticket: "/buyticket",
    claim: "/claim",
    support: "/support",
  },
};

export const LOCAL_STORAGE = {
  USER_TOKEN: "USER_TOKEN",
};

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
