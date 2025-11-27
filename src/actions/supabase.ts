"use server"

import { ChatHistorySchema } from "@/context/types";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "../lib/supabase/supabaseAdmin";

const supabase = getSupabaseAdmin()

// TODO FUNCTIONS

export async function getTodoList(userId: string) {
  const {data, error} = await supabase
  .from("todo_items")
  .select("*")
  .eq("user_id", userId)

  if (error) {

    console.error("Supabase Error fetching todos:", error.message);
    throw new Error("Falha ao carregar a lista de tarefas.");
  }

  return data
}

export async function completTask(id: number) {
  const {data, error} = await supabase
  .from("todo_items")
  .update({
    is_completed: true
  })
  .eq("id", id)

  if (error) {

    console.error("Supabase Error fetching todos:", error.message);
    throw new Error("Falha ao completar tarefa.");
  }

  revalidatePath('/');
  return data

}

export async function deleteTask(id: number) {
  const {data, error} = await supabase
  .from("todo_items")
  .delete()
  .eq('id', id)

  if (error) {

    console.error("Supabase Error fetching todos:", error.message);
    throw new Error("Falha ao deletar tarefa.");
  }

  revalidatePath('/');
  return data

}

// CHAT HISTORY FUNCTIONS

export async function getAllChatHistory(): Promise<ChatHistorySchema[]> {
  const {data, error} = await supabase
  .from('chat_history')
  .select("*")

  if (error) {

    console.error("Supabase Error fetching todos:", error.message);
    throw new Error("Falha ao carregar a lista de historico de chat.");
  }

  return data
}

export async function getChat(id: string): Promise<ChatHistorySchema> {
  const {data, error} = await supabase
  .from("chat_history")
  .select("*")
  .eq("id", id)

  if (error) {

    console.error("Supabase Error fetching todos:", error.message);
    throw new Error("Falha ao carregar a chat.");
  }

  return data[0]
}

export async function deleteChat(id: string) {
  const { error } = await supabase
  .from("chat_history")
  .delete()
  .eq('id', id)

  if (error) {

    console.error("Supabase Error fetching todos:", error.message);
    throw new Error("Falha ao deletar tarefa.");
  }

  revalidatePath('/');

}
