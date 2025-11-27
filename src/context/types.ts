import { Json } from "@/types/supabase";
import { ChatSchema } from "@/types/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IAppContexProviderProps {
  children: ReactNode
}


export interface IAppContextProps {
  chatHistory: string | undefined
  setChatHistory: Dispatch<SetStateAction<string | undefined>>
  intiateNewChat(): void
}

export interface ChatHistorySchema {
  id: string;
  user_id: string;
  created_at: string;
  conversation: ChatSchema[] | Json;
}
