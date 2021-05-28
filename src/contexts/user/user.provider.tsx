import React, { FC, useEffect, useMemo, useState } from "react";
import { setAxiosAuthorizationHeader, fetchRSI } from "../../api";
import { LOCAL_STORAGE } from "../../lib/constants";
import { IUser } from "../../Types/user.types";
import { ILogin, UserContext } from "./user.context";

const UserProvider: FC = (props) => {
  const { children } = props;

  const [user, setUser] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);
  const [ticketCode, setTicketCode] = useState<string | undefined>(undefined);
  const [rsi, setRSI] = useState<string | undefined>(undefined);

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

  const getRSI = async () => {
    try {
      const res = await fetchRSI();
      if (res.rsi) {
        setRSI(res.rsi);
      }
    } catch (error) {
      console.error("rsi fetching");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setRSI(undefined);
      return;
    }

    if (isLoggedIn && rsi === undefined) {
      getRSI();
    }
  }, [isLoggedIn, rsi]);

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
    }),
    [user, isLoggedIn, ticketCode, rsi],
  );

  return <UserContext.Provider {...{ value }}>{children}</UserContext.Provider>;
};

export default UserProvider;
