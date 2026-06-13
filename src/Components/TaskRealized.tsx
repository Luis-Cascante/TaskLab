import { useState } from "react"

function TaskRealized() {
  return (
    <>
    {/* Header: variable 1 */}
  <header className="bg-[#f0f2f5] text-[#1e293b] py-4 px-8 flex justify-between items-center font-medium shadow-sm border-b border-gray-200">
    {/* Isotipo/Logo izquierdo idéntico a la app */}
    <div className="flex items-center gap-2">
      <span className="text-[#111e38] text-2xl font-black tracking-tighter border-b-2 border-[#3b82f6]">
        T
      </span>
      <h2 className="text-xl font-bold tracking-wider text-[#111e38] hidden sm:inline">Tasklab</h2>
    </div>

    <nav>
      <ul className="flex gap-6 cursor-pointer text-sm font-bold text-gray-600 list-none">
        <li className="text-[#2563eb] border-b-2 border-[#2563eb] pb-1">Empleos</li>
        <li className="hover:text-[#2563eb] transition-colors">Trabajadores</li>
        <li className="hover:text-[#2563eb] transition-colors">Usuario</li>
        <li className="hover:text-[#2563eb] transition-colors">Chats</li>
      </ul>
    </nav>
  </header>
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
<div className="bg-[#1d61a1] text-white rounded-b-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-inner relative">
  
  {/* 1. COLUMNA IZQUIERDA: Espacio / Imagen del Trabajo Principal */}
  <div className="w-full md:w-72 h-48 md:h-64 bg-[#d1d5db] rounded-3xl flex-shrink-0 overflow-hidden shadow-md">
    <img 
      src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=400&auto=format&fit=crop" 
      alt="Detalle del trabajo solicitado" 
      className="w-full h-full object-cover opacity-90"
    />
  </div>

  {/* 2. COLUMNA DERECHA: Agrupa el Bloque Informativo + Galería de Fotos */}
  <div className="flex-1 flex flex-col justify-between gap-6">
    
    {/* Textos: Título, Calificación, Categoría y Descripción */}
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
        Título del trabajo
      </h2>
      
      {/* Detalles descriptivos */}
      <div className="text-sm space-y-1.5 mt-1">
        <p className="text-sm flex items-center gap-1 text-amber-400 font-semibold mb-2">
          ⭐⭐⭐⭐⭐ <span className="text-white ml-1">(4,5)</span>
        </p>
        
        {/* Nota: Cambié text-gray-900 a text-amber-400 o white para que resalte sobre el fondo azul */}
        <p className="text-gray-100">
          <strong className="text-amber-400 font-bold">Categoría:</strong> Categoría.
        </p>
        
        <p className="leading-relaxed text-gray-100 font-light text-justify">
          <strong className="text-amber-400 font-bold">Descripción:</strong> Lorem ipsum dolor sit amet consectetur. Ipsum risus sit tempor aliquet auctor. Mattis tortor eget magnis vitae dolor pulvinar. Maecenas vitae varius mauris eu. Accumsan ornare nulla hendrerit elementum. Tristique ultricies dictum interdum malesuada urna placerat eros non. Risus aliquam ut tortor posuere massa elementum at.
        </p>
      </div>
    </div>

    {/* Galería Inferior: Imágenes adicionales del portafolio */}
    <div className="flex flex-wrap gap-3 mt-2">
      {[1, 2, 3, 4].map((_, index) => (
        <div key={index} className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 border-white/20 shadow-md transition-transform hover:scale-105">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=150&auto=format&fit=crop" 
            alt={`Detalle adicional ${index + 1}`} 
            className="w-full h-full object-cover" 
          />
        </div>
      ))}
    </div>

  </div>
</div>

    </div>

  </main>
    </>
  )
}

export default TaskRealized
