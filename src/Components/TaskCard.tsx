import type { BackendTask } from "../types"
import { getTaskImageUrl } from "../utils/media"

type TaskCardProps = {
    task: BackendTask
    onOpenTask?: () => void;
}

function TaskCard({ task, onOpenTask }: TaskCardProps) {
    return (
        <div onClick={onOpenTask} className="bg-[#1d61a1] text-white rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-md transition-transform hover:scale-[1.01]">
          <div className="w-full sm:w-28 sm:h-28 bg-[#d1d5db] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img
              src={getTaskImageUrl(task.image)}
              alt="Trabajo"
              className="w-full h-full object-cover opacity-80"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <h4 className="text-lg font-bold text-[#f59e0b] tracking-wide">{task.title}</h4>
            <p className="text-xs font-bold text-gray-200 uppercase tracking-wider">
              {task.location} / {task.category.name} / {task.agreement.name}
            </p>
            <p className="text-xs text-blue-500 font-bold bg-white/90 inline-block px-2 py-0.5 rounded w-fit mt-0.5">
              Descripcion:
            </p>
            <p className="text-xs text-gray-100 font-light leading-relaxed mt-0.5">
              {task.description ?? "Sin descripción"}
            </p>
          </div>
        </div>
    )
}

export default TaskCard