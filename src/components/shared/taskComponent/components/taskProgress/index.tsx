import { TbPointFilled } from "react-icons/tb"
import style from "./style.module.scss"

interface TaskProgressProps {
  is_completed: boolean | null
}

export default function TaskProgress({ is_completed }: TaskProgressProps) {
  const styleProgress = is_completed ? style.TaskCompleted : style.TaskToDo

  return (
    <div className={`${style.TaskProgressContainer} ${styleProgress}`}>
      <p>
        <TbPointFilled size={16} />
        {is_completed ? "Completa" : "A fazer"}
      </p>
    </div>
  )
}
