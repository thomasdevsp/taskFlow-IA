"use server"

import { getTodoList } from "@/actions/supabase";
import { auth } from "@/app/api/auth/auth";
import HomeContent from "./components/homeContent";
import style from "./style.module.scss";

export default async function Home() {
  const session = await auth()

  const todoList = await getTodoList()

  const sortedList = todoList.sort((a, b) => {
    if (a.is_completed && !b.is_completed) {
      return 1
    }

    if (!a.is_completed && b.is_completed) {
      return -1
    }

    return 0
  })

  const todoListIsEmpty = todoList.length === 0

  return (
    <div className={style.HomeContainer}>
      <div className={style.HomeHeader}>
        <h1>Bom dia, {session?.user.name}</h1>
        <p>Quais os planos para hoje?</p>
      </div>

      <HomeContent
        todoIsEmpty={todoListIsEmpty}
        todoList={sortedList}
      />

    </div >
  );
}
