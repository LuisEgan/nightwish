import React, { FC, useEffect, useMemo, useState } from "react";
import { LOCAL_STORAGE } from "../../lib/constants";
import { IUser } from "../../Types/user.types";
import { ILogin, UserContext } from "./user.context";

const UserProvider: FC = (props) => {
  const { children } = props;

  const [user, setUser] = useState<IUser>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedInCached =
      !!user || !!localStorage.getItem(LOCAL_STORAGE.USER_TOKEN);

    setIsLoggedIn(isLoggedInCached);

    const cachedUser = localStorage.getItem(LOCAL_STORAGE.USER);
    if (cachedUser && !user) {
      setUser(JSON.parse(cachedUser));
    }
  }, [user]);

  const login = (params: ILogin) => {
    const { user: loginUser, accesstoken } = params;
    setUser(loginUser);
    localStorage.setItem(LOCAL_STORAGE.USER_TOKEN, accesstoken);
    localStorage.setItem(LOCAL_STORAGE.USER, JSON.stringify(loginUser));
  };

  const logout = () => {
    setUser(null);
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
    }),
    [user, isLoggedIn],
  );

  return <UserContext.Provider {...{ value }}>{children}</UserContext.Provider>;
};

export default UserProvider;
