"use client"

import { editTask } from "@/actions/supabase";
import { Dialog, Portal } from "@chakra-ui/react";
import { useState, useTransition } from "react";
import style from "./style.module.scss";

interface ModalEditTaskProps {
  title: string
  id: number
}

export default function ModalEditTask({ title, id }: ModalEditTaskProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [userInput, setUserInput] = useState(title)
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      await editTask(userInput, id);
      handleClose()
    });
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog.Root
      open={isOpen}
      size={{ mdDown: "full", md: "lg" }}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild
        onClick={(e) => {
          e.stopPropagation()
          handleToggle()
        }}>
        <p>
          Editar Tarefa
        </p>
      </Dialog.Trigger>

      <Portal>

        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content className={style.ModalBodyContent}>

            <Dialog.Header>

              <Dialog.Title className={style.ModalBodyContentTitle}>
                Editar tarefa
              </Dialog.Title>

            </Dialog.Header>

            <Dialog.Body >
              <form onSubmit={onSubmit} className={style.ModalContent}>
                <label>
                  <h1>
                    Título da tarefa:
                  </h1>

                  <input
                    type="text"
                    name="title"
                    placeholder="ex: Comprar pão"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    required />
                </label>

                <div className={style.ModalContentButtons}>
                  <button
                    type="button"
                    onClick={handleClose}
                    className={style.CancelButton}
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="AddTaskButton"
                  >
                    Editar tarefa
                  </button>
                </div>

              </form >
            </Dialog.Body>

          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>

    </Dialog.Root>
  )
}
