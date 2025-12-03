"use client"

import { insertTask } from "@/actions/supabase";
import { Dialog, Portal } from "@chakra-ui/react";
import { startTransition, useState } from "react";
import style from "./style.module.scss";

export default function ModalAddTask() {
  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = new FormData(e.currentTarget)

    startTransition(async () => {
      await insertTask(formElement);
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
      motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <button className={style.ModalTriggerButton} onClick={handleToggle}>
          Nova Tarefa +
        </button>
      </Dialog.Trigger>

      <Portal>

        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content className={style.ModalBodyContent}>

            <Dialog.Header>

              <Dialog.Title className={style.ModalBodyContentTitle}>
                Nova tarefa
              </Dialog.Title>

            </Dialog.Header>

            <Dialog.Body>
              <form onSubmit={onSubmit} className={style.ModalContent}>
                <label>
                  <h1>
                    Título da tarefa:
                  </h1>

                  <input type="text" name="title" placeholder="ex: Comprar pão" required />
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
                    Cadastrar nova tarefa
                  </button>
                </div>
              </form>
            </Dialog.Body>

          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>

    </Dialog.Root>
  )
}
