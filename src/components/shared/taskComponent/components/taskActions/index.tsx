"use client"

import { completTask, deleteTask, turnTodoTask } from "@/actions/supabase"
import ModalEditTask from "@/components/shared/modalEditTask"
import { Menu, Portal } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi"
import { FaChevronDown } from "react-icons/fa"
import style from "./style.module.scss"

interface TaskActionsProps {
  id: number,
  isCompleted: boolean,
  title: string | null
}

export default function TaskActions({ id, isCompleted, title }: TaskActionsProps) {

  const handleTurnToDoTask = async () => {
    await turnTodoTask(id)
  }

  const handleCompletTask = async () => {
    await completTask(id)
  }

  const handleDeleteTask = async () => {
    await deleteTask(id)
  }

  return (
    <div className={style.TaskActionsContainer}>
      <Menu.Root
        closeOnSelect={false}
      >
        <Menu.Trigger asChild>
          <FaChevronDown
            className={style.TaskActionsTrigger}
            size={18}
          />
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>

              <Menu.Item
                value="edit"
                onClick={(e) => { e.stopPropagation() }}  >

                <ModalEditTask key={id} title={title ?? ""} id={id} />

              </Menu.Item>

              {isCompleted ?
                (
                  <Menu.Item value="complet" onClick={handleTurnToDoTask}>

                    Mudar para a fazer

                  </Menu.Item>
                )
                :
                (
                  <Menu.Item value="complet" onClick={handleCompletTask}>

                    Completar tarefa

                  </Menu.Item>
                )}

            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

      <button
        className={style.DeleteButton}
        onClick={handleDeleteTask}
      >
        <BiTrash size={20} />
      </button>
    </div>
  )
}
