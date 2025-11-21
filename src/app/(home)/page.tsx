"use server"

import { getTodoList } from "@/src/actions/supabase";
import TaskComponent from "@/src/components/shared/taskComponent";
import style from "./style.module.scss";

export default async function Home() {

  const todoList = await getTodoList()

  const filteredTodoList = todoList.filter(item => item.is_completed === null)
  const completedTodoList = todoList.filter(item => item.is_completed === true)

  const todoListIsEmpty = todoList.length === 0

  return (
    <div className={style.HomeContainer}>
      <div className={style.HomeHeader}>
        <h1>Todo List With ChatBot</h1>

      </div>

      <div className={style.HomeContent}>
        {todoListIsEmpty ?
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
                <h3>Pending Tasks: {filteredTodoList.length}</h3>

                {filteredTodoList.map((item, index) => (
                  <TaskComponent
                    key={index}
                    {...item}
                  />
                ))}
              </div>

              <div className={style.HomeContentTasks}>
                <h3>Completed Tasks: {completedTodoList.length}</h3>

                {completedTodoList.map((item, index) => (
                  <TaskComponent
                    key={index}
                    {...item}
                  />
                ))}
              </div>
            </>
          )
        }

      </div>
    </div >
  );
}
