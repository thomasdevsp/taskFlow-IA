"use server"

import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "../lib/supabase/supabaseAdmin";

const supabase = getSupabaseAdmin()

export async function getTodoList() {
  const {data, error} = await supabase
  .from("todo_items")
  .select("*")

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
