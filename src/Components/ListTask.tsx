type ListTaskProps = {
  onOpenTask?: () => void
  onPublish?: () => void
}

const tasks = [
  {
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=150&auto=format&fit=crop",
    title: "Titulo del trabajo",
  },
  {
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=150&auto=format&fit=crop",
    title: "Titulo del trabajo",
  },
  {
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=150&auto=format&fit=crop",
    title: "Titulo del trabajo",
  },
]

function ListTask({ onOpenTask, onPublish }: ListTaskProps) {
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6 relative">
        <h1 className="text-xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
          Trabajos Publicados
        </h1>
        <h1 className="text-xl font-bold text-gray-800 sm:hidden">
          Trabajos
        </h1>

        <button
          type="button"
          onClick={onPublish}
          className="ml-auto bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-colors flex items-center gap-1 text-sm"
        >
          + Publicar solicitud
        </button>
      </div>

      <div className="bg-[#f59e0b] p-3 rounded-2xl shadow-lg">
        <div className="w-full flex gap-2 mb-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="search..." 
              className="w-full pl-4 pr-12 py-2 rounded-xl bg-[#e5e7eb] border-none text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
            />
            <button type="button" className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#1d61a1] hover:bg-[#154675] text-white p-1.5 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <aside className="bg-[#111e38] text-white p-5 rounded-xl flex flex-col gap-6 h-fit">
            <h4 className="text-xl font-bold text-[#f59e0b] tracking-wide border-b border-gray-700 pb-2">
              Filtros
            </h4>

            <div className="flex flex-col gap-3">
              <h5 className="text-base font-bold text-[#f59e0b]">Categorías</h5>
              <div className="flex flex-col gap-2.5 pl-1">
                {["Hogar", "Mantenimiento", "Construccion", "Tutoria"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 text-sm font-semibold cursor-pointer select-none hover:text-gray-300 transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#1d61a1] focus:ring-0 cursor-pointer accent-[#1d61a1]" />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h5 className="text-base font-bold text-[#f59e0b]">Contrato</h5>
              <div className="flex flex-col gap-2.5 pl-1">
                {[
                  { id: "hora", label: "Por hora" },
                  { id: "unico", label: "Pago unico" },
                  { id: "largo", label: "Contrato largo" },
                ].map((contract) => (
                  <label key={contract.id} className="flex items-center gap-3 text-sm font-semibold cursor-pointer select-none hover:text-gray-300 transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded text-[#1d61a1] focus:ring-0 cursor-pointer accent-[#1d61a1]" />
                    {contract.label}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section className="md:col-span-3 flex flex-col gap-4 bg-[#e5e7eb] p-4 rounded-xl">
            {tasks.map((task, index) => (
              <div key={`${task.title}-${index}`} className="bg-[#1d61a1] text-white rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-md transition-transform hover:scale-[1.01]">
                <div className="w-full sm:w-28 sm:h-28 bg-[#d1d5db] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img 
                    src={task.image} 
                    alt="Trabajo" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h4 className="text-lg font-bold text-[#f59e0b] tracking-wide">{task.title}</h4>
                    {index === 0 && onOpenTask ? (
                      <button type="button" onClick={onOpenTask} className="text-xs font-bold bg-white/10 border border-white/20 px-3 py-1 rounded-lg hover:bg-white/20 transition-colors w-fit">
                        Ver detalle
                      </button>
                    ) : null}
                  </div>
                  <p className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                    Ubicacion / Categoria / Tipo de contrato
                  </p>
                  <p className="text-xs text-blue-500 font-bold bg-white/90 inline-block px-2 py-0.5 rounded w-fit mt-0.5">
                    Descripcion:
                  </p>
                  <p className="text-xs text-gray-100 font-light leading-relaxed mt-0.5">
                    Lorem ipsum dolor sit amet consectetur. Purus at nunc sit et diam dolor turpis. Mi vitae nulla velit habitasse nunc ridiculus eget habitant commodo. Sagittis ut pellentesque vitae a at commodo ut suspendisse viverra.
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  )
}

export default ListTask