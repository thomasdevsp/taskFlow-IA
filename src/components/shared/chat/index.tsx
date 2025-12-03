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
  const { chatHistory, setChatHistory } = useAppContext()
  const session = useSession()
  const [isPending, startTransition] = useTransition();
  const [userMessageInput, setUserMessageInput] = useState('')
  const [chat, setChat] = useState<ChatSchema[]>([])
  const [chatId, setChatId] = useState<string | null>(null)
  const userId = session.data?.user.id ?? ""

  // MARK: Use Effect
  useEffect(() => {
    const savedChatHistory = localStorage.getItem('chatHistory')
    if (savedChatHistory) {
      setChatHistory(savedChatHistory)
    }

    if (!chatHistory) {
      return;
    }

    const loadChatHistory = async () => {

      try {
        const chatMessages = await getChat(chatHistory ?? "");

        if (chatMessages) {
          setChat(chatMessages.conversation as ChatSchema[]);

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

  // MARK: Handle Form Submit
  const handleFormSubmit = (formData: FormData) => {
    const userMessage = (formData.get('message') as string)?.trim()
    if (!userMessage) return

    const tempLoadingId = Date.now().toString()

    const newMessageAndPlaceholder = [
      { message: userMessage, author: "Client" },
      { message: '...', author: "Bot", id: tempLoadingId }
    ];

    flushSync(() => { //Força a dom atualizar para mostrar a mensagem do usuário antes de processar a resposta
      setUserMessageInput('');
      setChat(prev => ([
        ...(prev || []),
        ...newMessageAndPlaceholder
        // Placeholder
      ]));
    });

    const baseHistoryForSave = [
      ...chat,
      ...newMessageAndPlaceholder
    ].filter(msg => msg.message !== '...');

    startTransition(async () => {
      const actionResult = await processChatInput(userId, formData)

      const isError = actionResult.status === "error" || actionResult.status === "fatal_error"

      if (isError) {
        console.log(`Erro: ${actionResult.message}`);
      }

      const botResponseMessage: ChatSchema = {
        message: actionResult.message,
        author: "Bot"
      };

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

      const historyWithoutPlaceholder = baseHistoryForSave.filter(msg => msg.id !== tempLoadingId);

      // Constrói o histórico final imutável (const) para o salvamento
      const finalHistoryToSave = [
        ...historyWithoutPlaceholder, // Mensagens antigas + cliente
        botResponseMessage             // Resposta do Bot
      ];

      if (session.data?.user.id) {
        saveChatHistory(session.data.user.id, chatId, finalHistoryToSave)
          .then(saveResult => {
            // ✅ CORRETO: O saveResult aqui é o valor resolvido
            if (saveResult.success && saveResult.id && !chatId) {
              setChatId(saveResult.id);
              setChatHistory(saveResult.id);
            } else if (saveResult.success === false) {
              console.log("Algo deu errado ao tentar salvar o chat", saveResult);
            }
          })
          .catch(error => {
            // Trate erros de rede ou exceções de promise
            console.error("Erro fatal ao salvar o chat:", error);
          });
      }
    })

  }

  // MARK: Return Component
  return (
    <form action={handleFormSubmit} className={style.ChatContainer} >

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
          defaultValue={userMessageInput}
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
