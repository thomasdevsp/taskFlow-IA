import { formatSupabaseDate } from "@/src/utils/utils";
import { BiCategory } from "react-icons/bi";
import { CiClock1 } from "react-icons/ci";
import TaskActions from "./components/taskActions";
import style from "./style.module.scss";

interface TaskComponentSchema {
  id: number;
  created_at: string;
  is_completed: boolean | null;
  task_description: string | null;
  title: string | null;
  category: string | null;
}

export default async function TaskComponent({ id, title, category, is_completed, task_description: task, created_at: date }: TaskComponentSchema) {
  const dateFormatted = formatSupabaseDate(date)



  return (
    <div className={style.TaskContainer}>
      <div className={style.TaskContent}>
        <div>
          <h2>{title}</h2>
          <p>{task}</p>
        </div>

        <div className={style.TaskInfo}>
          <div
            className={style.Info}
          >

            <CiClock1 /><p>{dateFormatted}</p>
          </div>

          <div
            className={style.Info}
          >
            <BiCategory /><p>{category}</p>
          </div>
        </div>

      </div>
      <TaskActions
        id={id}
        isCompleted={is_completed!}
      />
    </div>
  )
}
