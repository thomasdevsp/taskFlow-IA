import { auth } from "@/app/api/auth/auth"
import AppContextProvider from "@/context/AppContexProvider"
import { ReactNode } from "react"
import AuthProvider from "../shared/authProvider"
import Chat from "../shared/chat"
import Sidebar from "../shared/sidebar"
import styles from "./style.module.scss"

interface LayoutProps {
  children: ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  const session = await auth()

  return (
    <AuthProvider session={session}>
      <AppContextProvider>
        <div className={styles.LayoutContainer}>
          <Sidebar />
          <div className={styles.LayoutContent}>
            {children}
          </div>
          <Chat />
        </div>
      </AppContextProvider>
    </AuthProvider>
  )
}
