"use server"

import { getSupabaseAdmin } from "@/lib/supabase/supabaseAdmin"
import { Json } from "@/types/supabase"
import { revalidatePath } from "next/cache"
import { ActionState, ChatSchema } from "../types/types"

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!
const N8N_AUTH_TOKEN = process.env.N8N_AUTH_TOKEN

const supabase = getSupabaseAdmin()

export async function processChatInput(
  userId: string,
  formData: FormData,
): Promise<ActionState> {
  const message = formData.get('message')

  if(!message || typeof message !== 'string' || message.trim() === "") {
    return { status: "error", message: "A mensagem não pode ser vazia"}
  }

  const payload = {
    message: message.trim().toLocaleLowerCase(),
    userId: userId,
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${N8N_AUTH_TOKEN}`
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    const data = await response.json()

    if(response.ok && data.status === "success") {
      revalidatePath('/');
    }

    if(!response.ok) {
      return {
        status: data.status || "api_error",
        message: data.message || `Erro de API com status ${response.status}`
      }
    }

    return data;
  }catch(error){
    console.error("Erro na chamada ao n8n:", error);
    return {status: 'fatal_error', message: 'Falha ao conectar com o serviço de automação'}

  }
}

export async function saveChatHistory(
  userId: string,
  chatId: string | null,
  chatHistory: ChatSchema[]
) {

  if(chatId) {
    const {error} = await supabase
    .from('chat_history')
    .update({conversation: chatHistory as unknown as Json})
    .eq('id', chatId)

    if(error) {
      console.error('Erro Supabase (UPDATE):', error);
      return { success: false, id: null };
    }

    return {success: true, id: chatId}

  } else {
    const {data, error} = await supabase
    .from("chat_history")
    .insert({
      id: crypto.randomUUID(),
      user_id: userId,
      conversation: chatHistory as unknown as Json,
    })
    .select('id')

    if(error || !data || data.length === 0) {
      console.error('Erro Supabase (INSERT):', error);
      return { success: false, id: null }
    }

    return {success: true, id: data[0].id}
  }


}

