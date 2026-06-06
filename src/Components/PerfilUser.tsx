{/* Sección del Banner Superior (Fondo azul con datos del trabajador, botones y navegación interna) */}
  <section className="bg-[#1d61a1] text-white pt-8 px-4 md:px-12 relative">
    {/* Contenedor flexible para alinear los datos y los botones a los extremos */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 max-w-7xl mx-auto">
      
      {/* Datos del Trabajador (Imagen + Textos a la par) */}
      <div className="flex items-center gap-4">
        <img 
          src="" 
          alt="perfil" 
          className="w-24 h-24 rounded-full border-4 border-white object-cover bg-gray-300"
        />
        <div>
          <p className="text-2xl font-bold tracking-wide">Juan Pepe</p>
          <p className="text-sm text-blue-200 font-medium">fontanero experto</p>
          <p className="text-sm flex items-center gap-1 my-1 text-amber-400 font-semibold">
            ⭐⭐⭐⭐⭐ <span className="text-white ml-1">4,5</span> <span className="text-blue-200 font-normal text-xs">(17 recomendaciones)</span>
          </p>
          <p className="text-xs text-blue-100">Macacona, Esparza</p>
          <p className="text-xs flex items-center gap-1.5 mt-1 font-medium text-green-300">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 block animate-pulse"></span> Disponible
          </p>
        </div>
      </div>

      {/* Botones de Acción laterales */}
      <div className="flex gap-4 w-full md:w-auto">
        <button className="flex-1 md:flex-none bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-2 px-6 rounded-lg text-sm shadow-md transition-all">
          Enviar mensaje
        </button>
        <button className="flex-1 md:flex-none bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-2 px-8 rounded-lg text-sm shadow-md transition-all">
          Contactar
        </button>
      </div>

    </div>

    {/* Menú de pestañas de navegación (Blanco pegado al borde inferior) */}
    <div className="bg-white text-gray-500 font-semibold text-sm -mx-4 md:-mx-12 px-4 md:px-12 border-b border-gray-200">
      <ul className="flex gap-8 max-w-7xl mx-auto list-none justify-center md:justify-start">
        <li className="py-4 text-[#3b82f6] border-b-2 border-[#3b82f6] cursor-pointer">Informacion General</li>
        <li className="py-4 hover:text-gray-800 transition-colors cursor-pointer">Portafolio</li>
        <li className="py-4 hover:text-gray-800 transition-colors cursor-pointer">Opiniones</li>
        <li className="py-4 hover:text-gray-800 transition-colors cursor-pointer">Contacto</li>
      </ul>
    </div>
  </section>