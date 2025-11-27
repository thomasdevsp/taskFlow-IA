"use client"

import { deleteChat } from "@/actions/supabase"
import { ChatHistorySchema } from "@/context/types"
import { useAppContext } from "@/context/useAppContext"
import { BiTrash } from "react-icons/bi"
import style from "./style.module.scss"

interface ChatHistoryProps {
  index: number
  item: ChatHistorySchema
}

export default function ChatHistory({ index, item }: ChatHistoryProps) {
  const { chatHistory, setChatHistory } = useAppContext()
  const styleActive = chatHistory === item.id ? style.ChatHistoryActive : ""

  const handleOnClick = () => {
    setChatHistory(item.id)
  }

  const handleDeleteChat = async (e: React.MouseEvent) => {
    e.stopPropagation()
    await deleteChat(item.id)
    setChatHistory("")
  }


  return (
    <div onClick={handleOnClick} className={`${style.ChatHistoryContainer} ${styleActive}`}>
      <span>Chat #{index}</span>

      <button
        className={style.DeleteButton}
        onClick={handleDeleteChat}
      >
        <BiTrash size={20} />
      </button>
    </div>
  )
}
