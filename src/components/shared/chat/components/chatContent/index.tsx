"use client"

import { ChatSchema } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import style from "./style.module.scss";

interface ChatContentProps {
  chat: ChatSchema[] | undefined;
}

export default function ChatContent({ chat }: ChatContentProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const session = useSession()
  const chatIsIniteated = (chat?.length ?? 0) > 0

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat])

  return chatIsIniteated ?
    (
      <div className={style.ChatContent} >
        {chat?.map((item, index) => {
          const styleClass = item.author === "Client" ? style.ClientMessage : style.BotMessage

          return (
            <div key={index} className={styleClass}>
              <div>
                <p>{item.message}</p>
                <span>{item.author}</span>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </div>
    )
    :
    (
      <div className={style.ChatContentNotStarted}>

        <div>
          <p>
            Olá, {session.data?.user.name}
          </p>

          <h1>
            Como posso te ajudar?
          </h1>
        </div>

        <img src="/robot.png" alt="" />



      </div>
    )
}
