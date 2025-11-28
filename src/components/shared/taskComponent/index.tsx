import TaskActions from "./components/taskActions";
import TaskProgress from "./components/taskProgress";
import style from "./style.module.scss";

interface TaskComponentSchema {
  id: number;
  created_at: string;
  is_completed: boolean | null;
  task_description: string | null;
  title: string | null;
  category: string | null;
}

export default async function TaskComponent({
  id,
  title,
  category,
  is_completed,
  task_description: task,
  created_at: date
}: TaskComponentSchema) {

  return (
    <div className={style.TaskContainer}>
      <div className={style.TaskContent}>
        <div>
          <h2>{title}</h2>
        </div>

        <TaskProgress
          is_completed={is_completed}
        />
      </div>

      <TaskActions
        id={id}
        isCompleted={is_completed!}
        title={title}
      />

    </div>
  )
}
