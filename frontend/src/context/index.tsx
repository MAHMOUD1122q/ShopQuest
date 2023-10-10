"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [user, setUser] = useState({});
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      setUser(userData);
    } else {
      setIsAuthUser(false);
      setUser({}); //unauthenticated user
    }
  }, [Cookies]);

  return (
    <GlobalContext.Provider
    value={{ 
      componentLevelLoader,
      setComponentLevelLoader,
      pageLevelLoader,
      setPageLevelLoader,
      isAuthUser,
      setIsAuthUser,
      user,
      setUser,
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}