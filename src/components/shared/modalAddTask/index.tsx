import { insertTask } from "@/actions/supabase";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import style from "./style.module.scss";

export default function ModalAddTask() {

  return (
    <Dialog.Root size={{ mdDown: "full", md: "lg" }} placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <button className={style.ModalTriggerButton}>
          Nova Tarefa +
        </button>
      </Dialog.Trigger>

      <Portal>

        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>

            <Dialog.Header>

              <Dialog.Title>
                Nova tarefa
              </Dialog.Title>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>

            </Dialog.Header>

            <Dialog.Body >
              <form action={insertTask} className={style.ModalContent}>
                <input type="text" name="title" placeholder="Nome da tarefa" required />

                <button
                  type="submit"
                >
                  Cadastrar nova tarefa
                </button>
              </form>
            </Dialog.Body>

          </Dialog.Content>
        </Dialog.Positioner>

      </Portal>

    </Dialog.Root>
  )
}
