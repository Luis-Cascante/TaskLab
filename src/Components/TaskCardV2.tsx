import type { task } from "./PruebasTaskData"

type TaskCardV2Props = {
    task: task
    onOpenTask?: () => void;
}

function TaskCardV2({ task, onOpenTask }: TaskCardV2Props) {
  return (
    <>
        <div 
        onClick={onOpenTask}
        className="snap-start shrink-0 w-full max-w-[320px] bg-[#111e38] rounded-3xl overflow-hidden shadow-lg border border-gray-800 transition-transform hover:scale-[1.05]">
  {/* Contenedor de la Imagen */}
  <div className="w-full h-48 overflow-hidden">
    <img 
      src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=150&auto=format&fit=crop" 
      alt="tarea" 
      className="w-full h-full object-cover" 
    />
  </div>

  {/* Contenido de la Card */}
  <div className="p-5 flex flex-col gap-2 bg-[#1d61a1]">
    {/* Título del trabajo */}
    <h4 className="text-xl font-bold text-[#f59e0b] tracking-wide">
      {task.title}
    </h4>

    {/* Categoría */}
    <p className="text-sm font-medium text-gray-400">
      {task.category}
    </p>

    {/* Descripción */}
    <p className="text-xs text-gray-200 font-light leading-relaxed mt-1">
      <span className="font-bold text-white block mb-0.5">Descripcion:</span>
      {task.description}
    </p>
  </div>
</div>
    </>
  )
}

export default TaskCardV2