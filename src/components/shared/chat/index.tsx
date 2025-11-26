"use client"

import { processChatInput, saveChatHistory } from "@/actions/actions";
import { getChat } from "@/actions/supabase";
import { useAppContext } from "@/context/useAppContext";
import { ChatSchema } from "@/types/types";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { flushSync } from "react-dom";
import { FaLocationArrow } from "react-icons/fa";
import InputComponent from "../inputComponent";
import ChatContent from "./components/chatContent";
import style from "./style.module.scss";


export default function Chat() {
  const { chatHistory } = useAppContext()
  const session = useSession()
  const [isPending, startTransition] = useTransition();
  const [userMessageInput, setUserMessageInput] = useState('')
  const [chat, setChat] = useState<ChatSchema[]>([])
  const [chatId, setChatId] = useState<string | null>(null)

  useEffect(() => {
    if (!chatHistory) {
      return;
    }

    const loadChatHistory = async () => {

      try {
        const chatMessages = await getChat(chatHistory ?? "");

        if (chatMessages) {
          setChat(chatMessages.conversation);

        }
        else {
          setChat([]);
        }
      } catch (error) {
        console.error("Erro ao carregar o histórico de chat:", error);
        setChat([]);
      }
    };

    loadChatHistory();

  }, [chatHistory, setChat]);

  const handleFormSubmit = (formData: FormData) => {
    const userMessage = userMessageInput.trim()

    if (!userMessage) return

    const tempLoadingId = Date.now().toString()

    flushSync(() => {
      setUserMessageInput('');
      setChat(prev => ([
        ...(prev || []),
        { message: userMessage, author: "Client" },
        { message: '...', author: "Bot", id: tempLoadingId } // Placeholder
      ]));
    });

    startTransition(async () => {
      const actionResult = await processChatInput(formData)

      const isError = actionResult.status === "error" || actionResult.status === "fatal_error"

      if (isError) {
        console.log(`Erro: ${actionResult.message}`);
      }

      setChat(prev => {
        const tempChat = prev.filter(msg => msg.id !== tempLoadingId)

        return [
          ...tempChat,
          {
            message: actionResult.message,
            author: "Bot"
          }
        ]
      })

      if (session.data?.user.id) {
        const saveResult = await saveChatHistory(session.data?.user.id, chatId, chat);

        if (saveResult.success && saveResult.id && !chatId) {
          setChatId(saveResult.id);
        }

        if (saveResult.success === false) {
          console.log("Algo deu errado ao tentar salvar o chat", saveResult);

        }

      }

    })
  }

  return (
    <form action={handleFormSubmit} className={style.ChatContainer}>

      <div className={style.ChatHeader}>
        <h1>Assistente IA</h1>

        <p>Tarefas, conversas, ideias.</p>
      </div>

      <ChatContent
        chat={chat}
      />

      <div className={style.ChatField}>
        <InputComponent
          name="message"
          placeholder="Digite alguma coisa"
          className={style.InputField}
          onChange={(e) => setUserMessageInput(e.target.value)}
          disabled={isPending}
        />

        <button
          className={style.SendButton}
          type="submit"
          disabled={isPending}
        >
          <FaLocationArrow />
        </button>
      </div>
    </form >
  )
}
