"use client"

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface IAuthProviderProps {
  session: Session | null;
  children: ReactNode;
}

export default function AuthProvider({ session, children }: IAuthProviderProps) {

  if (!session) {
    window.location.replace('/login')
  }

  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
