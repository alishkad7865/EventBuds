import React, { createContext, useEffect, useState } from "react";
import { getLoggedUser } from "../api/userApi";
export const UserContext = createContext();
export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("eventBudsToken"));
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const inititalUser = {
    ADDRESS: "",
    BIO: "",
    EMAIL: "",
    FIRSTNAME: "",
    FRIENDS: "",
    LASTNAME: "",
    SEX: "",
    USERID: 0,
  };
  const [user, setUser] = useState(inititalUser);
  useEffect(() => {
    if (user?.USERID !== 0) {
      if (
        token !== "null" &&
        token !== null &&
        token !== "undefined" &&
        token !== undefined
      ) {
        setUserLoggedIn(true);
      }
    }
  }, [user, token]);
  useEffect(() => {
    const fetchloggedUser = async () => {
      let result = await getLoggedUser(token);
      if (!result) {
        setToken(null);
        setUserLoggedIn(false);
        return;
      }
      localStorage.setItem("eventBudsToken", token);
      setUser(result.data);
    };
    fetchloggedUser();
  }, [token]);

  return (
    <>
      <UserContext.Provider
        value={{
          token,
          setToken,
          userLoggedIn,
          setUserLoggedIn,
          user,
          setUser,
          inititalUser,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};
