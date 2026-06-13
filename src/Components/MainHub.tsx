import { useState } from "react"

import TaskCardV2 from "../Components/TaskCardV2"

function MainHub() {
  return (
    <>
          {/* Hero Section: Título principal sobre fondo azul marino oscuro */}
  <section className="bg-[#111e38] text-white text-center py-16 px-4">
    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
      Bienvenido a <span className="text-[#f59e0b]">TaskLab</span>
    </h1>
    <h2 className="text-xl md:text-2xl font-semibold text-[#cbd5e1] max-w-2xl mx-auto">
      Una plataforma construida por y para el pueblo
    </h2>
  </section>

  {/* CTA Section: Dos bloques distribuidos equitativamente en fondo blanco */}
  <section className="bg-white text-[#1e293b] max-w-6xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
    {/* Bloque Izquierdo: ¿Necesitas una mano? */}
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <div className="flex items-center text-center max-w-md mx-auto">
        <img src="src/assets/img/hands.png" alt="solicitud" className="w-12 h-16 mb-4 object-contain" />
        <h3 className="text-4xl font-bold text-[#f59e0b] mb-3">¿Necesitas un mano?</h3>
      </div>
      <h4 className="text-base text-[#64748b] leading-relaxed mb-6 min-h-[48px]">
        Publica tu solicitud de trabajo y recibe ayuda rápida y confiable
      </h4>
      <button className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all w-full sm:w-auto">
        Publicar solicitud →
      </button>
    </div>

    {/* Bloque Derecho: ¿Buscando trabajo? */}
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      <div className="flex items-center text-center max-w-md mx-auto">
        <img src="src/assets/img/pala.png" alt="pala" className="w-10 h-16 mb-4 object-contain" />
        <h3 className="text-4xl font-bold text-[#f59e0b] mb-3">¿Buscando trabajo?</h3>
      </div>
      <h4 className="text-base text-[#64748b] leading-relaxed mb-6 min-h-[48px]">
        Explora las mejores oportunidades de trabajo publicadas cerca de ti
      </h4>
      <button className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all w-full sm:w-auto">
        Ver trabajos →
      </button>
    </div>
  </section>

  {/* Categories Section: Título "Navega por categorías" y contenedor gris oscuro */}
<section className="bg-[#111e38] text-white text-center py-16 px-4">
  <h2 className="text-3xl font-bold mb-10">Mira estas solicitudes</h2>
  
  {/* 🛠️ CONTENEDOR DEL CARRUSEL */}
  <div className="
    flex 
    overflow-x-auto 
    scroll-smooth 
    snap-x 
    snap-mandatory 
    gap-6 
    max-w-6xl 
    mx-auto 
    p-4
    bg-transparent 
    rounded-xl 
    scrollbar-none
  ">
    
    {/* 🛠️ CADA TARJETA DEBE TENER 'snap-start' Y UN ANCHO ASIGNADO PARA NO ENCOGERSE */}
    
      <TaskCardV2/>

      <TaskCardV2/>

      <TaskCardV2/>

      <TaskCardV2/>

      <TaskCardV2/>

  </div>
</section>
    </>
  )
}

export default MainHub
