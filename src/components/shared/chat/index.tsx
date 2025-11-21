"use client"

import { processChatInput } from "@/src/actions/actions";
import { ActionState, ChatSchema } from "@/src/types/types";
import { useActionState, useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import InputComponent from "../inputComponent";
import ChatContent from "./components/chatContent";
import style from "./style.module.scss";


export default function Chat() {
  const initialState: ActionState = { status: 'pending', message: 'Aguardando input...' };

  const [state, formAction] = useActionState(processChatInput, initialState);
  const [chat, setChat] = useState<ChatSchema[]>([])
  const [userMessageInput, setUserMessageInput] = useState('')

  const handleFormSubmit = (formData: FormData) => {
    if (userMessageInput.trim()) {
      setChat(prev => ([
        ...(prev || []),
        {
          message: userMessageInput,
          author: "Client"
        },
      ]))
      setUserMessageInput('')
    }

    formAction(formData)
  }

  useEffect(() => {
    if (state.status === "idle") return

    const isSuccess = state.status === "success"
    const isError = state.status === "error" || state.status === "fatal_error"

    if (state.status) {
      setTimeout(() => {
        setChat(prev => ([
          ...(prev || []),
          {
            message: state.message,
            author: "Bot"
          }
        ]))
      }, 0);

    } else if (isError) {
      console.error(`Erro: ${state.message}`);

      setTimeout(() => {
        setChat(prev => ([
          ...(prev || []),
          {
            message: state.message,
            author: "Bot"
          }
        ]))
      }, 50);

    }
  }, [state])

  console.log(chat);


  return (
    <form action={handleFormSubmit} className={style.ChatContainer}>

      <ChatContent
        chat={chat}
      />

      <div className={style.ChatField}>
        <InputComponent
          name="message"
          placeholder="Digite alguma coisa"
          className={style.InputField}
          onChange={(e) => setUserMessageInput(e.target.value)}
        />

        <button
          className={style.SendButton}
          type="submit"
        >
          <FaLocationArrow />
        </button>
      </div>
    </form >
  )
}
