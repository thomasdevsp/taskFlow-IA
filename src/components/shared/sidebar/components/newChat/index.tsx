"use client"

import { useAppContext } from "@/context/useAppContext"
import { RiChatNewLine } from "react-icons/ri"
import style from "./style.module.scss"

export default function NewChat() {
  const { intiateNewChat } = useAppContext()

  const handleOnClick = () => {
    intiateNewChat()
  }

  return (
    <div className={style.NewChatContainer} onClick={handleOnClick}>
      <RiChatNewLine /> <span>Nova Conversa</span>
    </div>
  )
}
