function TaskCard() {

    return (
        <>
            {/* TARJETA TRABAJO 2 */}
          <div className="bg-[#1d61a1] text-white rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-md transition-transform hover:scale-[1.01]">
            <div className="w-full sm:w-28 sm:h-28 bg-[#d1d5db] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=150&auto=format&fit=crop" 
                alt="Trabajo" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <h4 className="text-lg font-bold text-[#f59e0b] tracking-wide">Titulo del trabajo</h4>
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
        </>
    )
}

export default TaskCard