import { ReactNode } from "react"
import Chat from "../shared/chat"
import styles from "./style.module.scss"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <body className={styles.LayoutContainer}>
      <div className={styles.LayoutContent}>
        {children}
      </div>
      <Chat />
    </body>
  )
}
