"use client"

import { useState } from "react";
import { AppContext } from "./AppContex";
import { IAppContexProviderProps } from "./types";

export default function AppContextProvider({ children }: IAppContexProviderProps) {
  const [chatHistory, setChatHistory] = useState<string>()

  function intiateNewChat() {
    setChatHistory(crypto.randomUUID())
  }

  return (
    <AppContext.Provider
      value={{
        chatHistory,
        setChatHistory,
        intiateNewChat,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
