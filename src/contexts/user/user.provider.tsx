import React, { FC, useEffect, useMemo, useState } from "react";
import { setAxiosAuthorizationHeader } from "../../api";
import { LOCAL_STORAGE } from "../../lib/constants";
import { IUser } from "../../Types/user.types";
import { ILogin, UserContext } from "./user.context";

const UserProvider: FC = (props) => {
  const { children } = props;

  const [user, setUser] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [ticketCode, setTicketCode] = useState<string | undefined>(undefined);
  const [rsi, setRSI] = useState<string | undefined>(undefined);
  const [activity, setActivity] = useState<boolean>(true);

  useEffect(() => {
    const isLoggedInCached =
      !!user || !!localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);

    setIsLoggedIn(isLoggedInCached);

    const cachedUser = localStorage.getItem(LOCAL_STORAGE.USER);
    if (cachedUser && !user) {
      setUser(JSON.parse(cachedUser));
    }

    if (user) {
      localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(user));
    }
  }, [user]);

  const login = (params: ILogin): Promise<void> =>
    new Promise((resolve, reject) => {
      const { user: loginUser, accessToken } = params;

      if (!accessToken) reject();

      setUser(loginUser);
      setIsLoggedIn(true);
      localStorage.setItem(LOCAL_STORAGE.USER_TOKEN, accessToken);
      localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(loginUser));
      setAxiosAuthorizationHeader(accessToken);
      resolve();
    });

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setTicketCode(undefined);
    localStorage.removeItem(LOCAL_STORAGE.USER_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.USER);
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      isLoggedIn,
      ticketCode,
      setTicketCode,
      rsi,
      setRSI,
      activity,
      setActivity,
    }),
    [user, isLoggedIn, ticketCode, rsi, activity],
  );

  return <UserContext.Provider {...{ value }}>{children}</UserContext.Provider>;
};

export default UserProvider;
