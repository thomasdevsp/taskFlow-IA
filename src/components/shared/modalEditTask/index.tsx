"use client"

import { editTask } from "@/actions/supabase";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState, useTransition } from "react";
import style from "./style.module.scss";

interface ModalEditTaskProps {
  title: string
  id: number
}

export default function ModalEditTask({ title, id }: ModalEditTaskProps) {
  const [userInput, setUserInput] = useState(title)
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // CRÍTICO: Para usar a lógica JS e não o submit nativo

    startTransition(async () => {
      // Sua Server Action editTask(newTitle, id)
      await editTask(userInput, id);
      // Opcional: Fechar o modal aqui se a edição for bem-sucedida
    });
  }

  return (
    <Dialog.Root
      size={{ mdDown: "full", md: "lg" }}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
        <p>
          Editar Tarefa
        </p>
      </Dialog.Trigger>

      <Portal>

        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>

            <Dialog.Header>

              <Dialog.Title>
                Editar tarefa
              </Dialog.Title>

              <Dialog.CloseTrigger asChild onClick={(e) => e.stopPropagation()}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>

            </Dialog.Header>

            <Dialog.Body >
              <form onSubmit={onSubmit} className={style.ModalContent}>
                <input
                  type="text"
                  name="title"
                  placeholder="Nome da tarefa"
                  required
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />

                <button
                  type="submit"
                >
                  Editar tarefa
                </button>
              </form >
            </Dialog.Body>

          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>

    </Dialog.Root>
  )
}
