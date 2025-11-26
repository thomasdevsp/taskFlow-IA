import { getSupabaseAdmin } from "@/lib/supabase/supabaseAdmin";
import { AuthOptions, DefaultSession, DefaultUser, getServerSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string ;
  }

  interface Session extends DefaultSession {
    user: {
      id: string | undefined;
    } & DefaultSession["user"];
  }
}

const supabase = getSupabaseAdmin()

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "offline",
          // prompt: "consent",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login/error",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single()

      if (fetchError) {
        console.error("Erro ao buscar usuário no Supabase:", fetchError)
      }

      if (!existingUser) {
        const { error: insertError } = await supabase
        .from("users")
        .insert({
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        })

        if (insertError){
          console.error("Erro ao inserir novo usuário:", insertError)
          return false
        }
      }

      return true
    },
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id
      }

      return token

    },
    async session({ session, token }: {session: Session, token: JWT}) {

      if (token && session.user) {
        session.user.id = token.sub
      }

      return session
    },
  },
}

export async function auth() {
    return getServerSession(authConfig)
}
