function Portafolio() {
  return (
    <section className="bg-white py-12 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-[#1d61a1] group aspect-[4/3]">
          <img 
            src="" 
            alt="Breter" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1d61a1] via-[#1d61a1]/90 to-transparent pt-12 pb-4 px-4 text-white">
            <p className="text-xs text-gray-300 font-medium mb-1">16 de abril 2023</p>
            <p className="text-lg font-bold tracking-wide mb-1">Instalación de lavamanos</p>
            <p className="text-sm text-amber-400 font-semibold flex items-center gap-0.5">
              ⭐⭐⭐⭐⭐
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-md bg-[#1d61a1] group aspect-[4/3]">
          <img src="" alt="Breter" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1d61a1] via-[#1d61a1]/90 to-transparent pt-12 pb-4 px-4 text-white">
            <p className="text-xs text-gray-300 font-medium mb-1">22 de agosto 2023</p>
            <p className="text-lg font-bold tracking-wide mb-1">Instalación de lavamanos</p>
            <p className="text-sm text-amber-400 font-semibold flex items-center gap-0.5">
              ⭐⭐⭐⭐⭐
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-md bg-[#1d61a1] group aspect-[4/3]">
          <img src="" alt="Breter" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1d61a1] via-[#1d61a1]/90 to-transparent pt-12 pb-4 px-4 text-white">
            <p className="text-xs text-gray-300 font-medium mb-1">2 de febrero 2025</p>
            <p className="text-lg font-bold tracking-wide mb-1">Instalación de tuberías</p>
            <p className="text-sm text-amber-400 font-semibold flex items-center gap-0.5">
              ⭐⭐⭐
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portafolio