import ModalAddTask from "@/components/shared/modalAddTask"
import TaskComponent from "@/components/shared/taskComponent"
import { TodoListSchema } from "@/types/types"
import style from "./style.module.scss"

interface HomeContentProps {
  todoIsEmpty: boolean
  todoList: TodoListSchema[]
}

export default function HomeContent({ todoIsEmpty, todoList }: HomeContentProps) {
  return (
    <div className={style.HomeContent}>

      <div className={style.HomeContentHeader}>
        <h1>Suas Tarefas</h1>

        <ModalAddTask />
      </div>

      {todoIsEmpty ?
        (
          <div>
            <h1>
              No momento você não tem nenhum tarefa,
              que tal pedir para seu assistente cadastrar alguma tarefa para você!!
            </h1>
          </div>
        )
        :
        (
          <>
            <div className={style.HomeContentTasks}>

              {todoList.map((item, index) => (
                <div key={index}>
                  <TaskComponent
                    {...item}
                  />
                  {index + 1 < todoList.length && (
                    <div className={style.TaskDivider} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  )
}
