import { Database } from "@/types/supabase"
import { createClient } from "@supabase/supabase-js"

let supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null

export function getSupabaseAdmin() {
// 1. Checagem de ambiente
    if (typeof window !== "undefined") {
        throw new Error("Supabase Admin Client só pode ser usado no servidor.")
    }

    if (!process.env.SUPABASE_PROJECT_URL || !process.env.SUPABASE_API_KEY) {
         throw new Error("Variáveis de ambiente do Supabase Admin (URL e Key) estão ausentes.")
    }

    if (!supabaseAdmin) {
      supabaseAdmin = createClient<Database>(
          process.env.SUPABASE_PROJECT_URL,
          process.env.SUPABASE_API_KEY,
      )
    }

    return supabaseAdmin
}
