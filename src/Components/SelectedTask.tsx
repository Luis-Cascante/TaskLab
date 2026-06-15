import type { task } from "./PruebasTaskData"
import TaskCard from "./TaskCard"
    
    
    type SelectedTaskProps = {
      onBack?: () => void
      onContact?: () => void
      onOpenProfile?: () => void
      onOpenTask?: () => void
      Task: task
      Tasks: task[]
    }

    function SelectedTask({ onBack, onContact, onOpenProfile, onOpenTask, Task, Tasks }: SelectedTaskProps) {
      return (
        <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
          <div className="text-center py-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Trabajos Publicados
            </h1>
          </div>

          <div className="bg-[#f59e0b] rounded-2xl shadow-lg flex flex-col">
            <div className="flex justify-start m-1">
              <button type="button" onClick={onBack} className="bg-[#111e38] hover:bg-[#1a2e54] text-white p-2 rounded-xl transition-colors flex items-center justify-center shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>

            <div className="bg-[#1d61a1] text-white rounded-b-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-inner relative">
              <div className="w-full md:w-72 h-48 md:h-64 bg-[#d1d5db] rounded-3xl flex-shrink-0 overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop" 
                  alt="Detalle del trabajo solicitado" 
                  className="w-full h-full object-cover opacity-90"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                    {Task.title}
                  </h2>
                  <p className="text-xs md:text-sm font-semibold text-gray-900 bg-white/20 w-fit px-3 py-1 rounded-md">
                    <span className="font-bold">Trabajo solicitado por:</span> <span onClick={onOpenProfile} className="cursor-pointer hover:text-yellow-400 transition-colors">
                      {Task.employer}
                    </span>
                  </p>

                  <div className="text-sm space-y-1.5 mt-2">
                    <p className="leading-relaxed text-gray-100 font-light text-justify">
                      <strong className="text-gray-900 font-bold">Descripcion:</strong> {Task.description}
                    </p>
                    <p className="text-gray-100"><strong className="text-gray-900 font-bold">Ubicacion:</strong> {Task.location}</p>
                    <p className="text-gray-100"><strong className="text-gray-900 font-bold">Categoria:</strong> {Task.category}</p>
                    <p className="text-gray-100"><strong className="text-gray-900 font-bold">Contrato:</strong> {Task.agreement}</p>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button type="button" onClick={onContact} className="bg-[#f59e0b] hover:bg-[#e08e06] text-gray-900 font-black text-base px-8 py-2.5 rounded-xl shadow-md transition-colors tracking-wide">
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4 mt-4">
            <div className="text-center py-2">
              <h3 className="text-lg font-bold text-gray-800">
                Otras solicitudes
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {Tasks.map((task) => (
                <TaskCard key={task.id} task={task} onOpenTask={onOpenTask} />
              ))}
            </div>
          </div>
        </main>
      )
    }

    export default SelectedTask