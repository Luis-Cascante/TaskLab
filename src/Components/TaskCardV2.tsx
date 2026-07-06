import type { BackendTask } from "../types"
import { getTaskImageUrl } from "../utils/media"

type TaskCardV2Props = {
    task: BackendTask
    onOpenTask?: () => void;
}

function TaskCardV2({ task, onOpenTask }: TaskCardV2Props) {
  return (
    <div
      onClick={onOpenTask}
      className="snap-start shrink-0 w-full max-w-[320px] bg-[#111e38] rounded-3xl overflow-hidden shadow-lg border border-gray-800 transition-transform hover:scale-[1.05]"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={getTaskImageUrl(task.image)}
          alt="tarea"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex flex-col gap-2 bg-[#1d61a1]">
        <h4 className="text-xl font-bold text-[#f59e0b] tracking-wide">
          {task.title}
        </h4>

        <p className="text-sm font-medium text-gray-400">
          {task.category.name}
        </p>

        <p className="text-xs text-gray-200 font-light leading-relaxed mt-1">
          <span className="font-bold text-white block mb-0.5">Descripcion:</span>
          {task.description ?? "Sin descripción"}
        </p>
      </div>
    </div>
  )
}

export default TaskCardV2