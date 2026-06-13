function MainHub() {
  return (
    <div>
      <section className="bg-[#111e38] text-white text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Bienvenido a <span className="text-[#f59e0b]">TaskLab</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-[#cbd5e1] max-w-2xl mx-auto">
          Una plataforma construida por y para el pueblo
        </h2>
      </section>

      <section className="bg-white text-[#1e293b] max-w-6xl mx-auto py-16 px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <img src="" alt="solicitud" className="w-16 h-16 mb-4 object-contain" />
          <h3 className="text-2xl font-bold text-[#f59e0b] mb-3">¿Necesitas un mano?</h3>
          <h4 className="text-base text-[#64748b] leading-relaxed mb-6 min-h-[48px]">
            Publica tu solicitud de trabajo y recibe ayuda rápida y confiable
          </h4>
          <button className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all w-full sm:w-auto">
            Publicar solicitud →
          </button>
        </div>

        <div className="flex flex-col items-center text-center max-w-md mx-auto">
          <img src="" alt="pala" className="w-16 h-16 mb-4 object-contain" />
          <h3 className="text-2xl font-bold text-[#f59e0b] mb-3">¿Buscando trabajo?</h3>
          <h4 className="text-base text-[#64748b] leading-relaxed mb-6 min-h-[48px]">
            Explora las mejores oportunidades de trabajo publicadas cerca de ti
          </h4>
          <button className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all w-full sm:w-auto">
            Ver trabajos →
          </button>
        </div>
      </section>

      <section className="bg-[#111e38] text-white text-center py-16 px-4">
        <h2 className="text-3xl font-bold mb-10">Mira estas solicitudes</h2>
        <div className="max-w-6xl mx-auto bg-transparent rounded-xl p-2">
          <p className="text-gray-400 italic font-light">por hacer</p>
        </div>
      </section>
    </div>
  )
}

export default MainHub