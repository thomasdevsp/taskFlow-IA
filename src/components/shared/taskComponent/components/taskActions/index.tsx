"use client"

import { completTask, deleteTask } from "@/src/actions/supabase"
import { BiCheck, BiPencil, BiX } from "react-icons/bi"
import style from "./style.module.scss"


export default function TaskActions({ id, isCompleted }: { id: number, isCompleted: boolean }) {

  const handleCompletTask = async () => {
    const response = await completTask(id)
  }

  const handleDeleteTask = async () => {
    const response = await deleteTask(id)
  }
  return (
    <div className={style.TaskActions}>
      <button className={style.EditButton}>
        <BiPencil />
      </button>

      {!isCompleted && (
        <button
          className={style.ConfirmButton}
          onClick={handleCompletTask}
        >
          <BiCheck />
        </button>
      )}

      <button
        className={style.DeleteButton}
        onClick={handleDeleteTask}
      >
        <BiX />
      </button>
    </div>
  )
}
