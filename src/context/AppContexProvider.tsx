"use client"

import { useEffect, useState } from "react";
import { AppContext } from "./AppContex";
import { IAppContexProviderProps } from "./types";

export default function AppContextProvider({ children }: IAppContexProviderProps) {
  const [chatHistory, setChatHistory] = useState<string>()

  useEffect(() => {
    if (chatHistory) {
      localStorage.setItem('chatHistory', chatHistory)
    }
  }, [chatHistory])

  function intiateNewChat() {
    setChatHistory("")
    localStorage.removeItem('chatHistory')
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
