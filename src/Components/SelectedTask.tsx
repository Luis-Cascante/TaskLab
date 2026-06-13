import { useState } from "react"

import TaskCard from "../Components/TaskCard"

function SelectedTask() {
  return (
    <>
          {/* 2. SECCIÓN PRINCIPAL */}
  <main className="flex-1 max-w-5xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
    
    {/* Fila del Título Central */}
    <div className="text-center py-2">
      <h1 className="text-3xl font-bold text-gray-800">
        Trabajos Publicados
      </h1>
    </div>

    {/* Contenedor del Tablero Naranja (Vista Detallada de la Solicitud Principal) */}
    <div className="bg-[#f59e0b]  rounded-2xl shadow-lg flex flex-col ">
      
      {/* Botón Volver (Flecha izquierda estilizada en círculo azul oscuro) */}
      <div className="flex justify-start m-1" >
        <button className="bg-[#111e38] hover:bg-[#1a2e54] text-white p-2 rounded-xl transition-colors flex items-center justify-center shadow-md">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>

      {/* Contenedor de la Tarjeta de Trabajo Destacada (Azul Rey Amplio) */}
      <div className="bg-[#1d61a1] text-white rounded-b-2xl md:p-8 flex flex-col md:flex-row gap-6 shadow-inner relative">
        
        {/* Espacio / Imagen del Trabajo Principal (Grande y redondeada) */}
        <div className="w-full md:w-72 h-48 md:h-64 bg-[#d1d5db] rounded-3xl flex-shrink-0 overflow-hidden shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop" 
            alt="Detalle del trabajo solicitado" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Bloque Informativo */}
        <div className="flex-1 flex flex-col justify-between gap-4">
          
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
              Titulo del trabajo
            </h2>
            <p className="text-xs md:text-sm font-semibold text-gray-900 bg-white/20 w-fit px-3 py-1 rounded-md">
              <span className="font-bold">Trabajo solicitado por:</span> Nombre de usuario
            </p>
            
            {/* Detalles descriptivos */}
            <div className="text-sm space-y-1.5 mt-2">
              <p className="leading-relaxed text-gray-100 font-light text-justify">
                <strong className="text-gray-900 font-bold">Descripcion:</strong> Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum. Tristique ultricies dictum interdum malesuada urna placerat eros non. Risus aliquam ut tortor posuere massa elementum at.
              </p>
              <p className="text-gray-100"><strong className="text-gray-900 font-bold">Ubicacion:</strong> Ubicacion.</p>
              <p className="text-gray-100"><strong className="text-gray-900 font-bold">Categoria:</strong> Categoria.</p>
              <p className="text-gray-100"><strong className="text-gray-900 font-bold">Contrato:</strong> Tipo de contrato.</p>
            </div>
          </div>

          {/* Botón Contactar posicionado abajo a la derecha */}
          <div className="flex justify-end mt-4">
            <button className="bg-[#f59e0b] hover:bg-[#e08e06] text-gray-900 font-black text-base px-8 py-2.5 rounded-xl shadow-md transition-colors tracking-wide">
              Contactar
            </button>
          </div>

        </div>
      </div>

    </div>

    {/* Sección de Otras Solicitudes (Alineado y bien espaciado) */}
    <div className="w-full flex flex-col gap-4 mt-4">
      
      <div className="text-center py-2">
        <h3 className="text-lg font-bold text-gray-800">
          Otras solicitudes
        </h3>
      </div>

      {/* TARJETA TRABAJO SECUNDARIA 1 */}
      <TaskCard/>

      {/* TARJETA TRABAJO SECUNDARIA 2 */}
      <div className="bg-[#1d61a1] text-white rounded-xl p-4 flex flex-col sm:flex-row gap-4 shadow-md transition-transform hover:scale-[1.01]">
        <div className="w-full sm:w-28 sm:h-28 bg-[#d1d5db] rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=150&auto=format&fit=crop" 
            alt="Trabajo secundario" 
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

    </div>
  </main>
    </>
  )
}

export default SelectedTask
