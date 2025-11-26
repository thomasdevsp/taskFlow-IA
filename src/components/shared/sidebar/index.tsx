import { getAllChatHistory } from "@/actions/supabase";
import ChatHistory from "./components/chatHistory";
import NewChat from "./components/newChat";
import Perfil from "./components/perfil";
import style from "./style.module.scss";

export default async function Sidebar() {

  const data = await getAllChatHistory()

  return (
    <div className={style.SidebarContainer}>

      <div className={style.SidebarContent}>
        <h1>
          TodoList + Chatbot
        </h1>

        <NewChat />


        <div className={style.SidebarChatHistory}>
          <p>Conversas</p>

          <div className={style.SidebarChatHistoryList}>
            {data.map((item, index) => (
              <ChatHistory
                key={index}
                index={index}
                item={item}
              />
            ))}
          </div>

        </div>
      </div>

      <Perfil />
    </div>
  )
}
