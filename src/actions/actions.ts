"use server"

import { revalidatePath } from "next/cache"
import { ActionState } from "../types/types"

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL!
const N8N_AUTH_TOKEN = process.env.N8N_AUTH_TOKEN


export async function processChatInput(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const message = formData.get('message')

  if(!message || typeof message !== 'string' || message.trim() === "") {
    return { status: "error", message: "A mensagem não pode ser vazia"}
  }

  const payload = {
    message: message.trim().toLocaleLowerCase()
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


