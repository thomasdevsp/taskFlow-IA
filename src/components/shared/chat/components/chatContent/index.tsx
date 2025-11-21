import { ChatSchema } from "@/src/types/types"
import style from "./style.module.scss"

interface ChatContentProps {
  chat: ChatSchema[]
}

export default function ChatContent({ chat }: ChatContentProps) {
  const chatIsIniteated = chat.length > 1

  return chatIsIniteated ?
    (
      <div className={style.ChatContent}>
        {chat?.slice(1).map((item, index) => {
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
      </div>
    )
    :
    (
      <div className={style.ChatContentNotStarted}>
        <img src="/robot.png" alt="" />

        <h1>
          Olá sou seu Chat Assistente!!
        </h1>
        <p>Está pronto para gerenciar suas tarefas?
          <br />
          quando quiser iniciar é só me encaminhar uma mensagem
        </p>
      </div>
    )
}
