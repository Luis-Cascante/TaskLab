type PublicarSolicitudProps = {
  onCancel?: () => void
}

function PublicarSolicitud({ onCancel }: PublicarSolicitudProps) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <section className="hidden md:flex md:w-1/2 bg-[#111e38] items-center justify-center p-12">
        <img 
          src="/assets/login.png" 
          alt="Logo TaskLab" 
          className="w-2/3 h-auto object-contain opacity-80" 
        />
      </section>

      <section className="flex-1 bg-[#e5e7eb] flex flex-col items-center justify-center px-8 py-12 md:px-24">
        <div className="w-full flex justify-end mb-2">
          <button 
            type="button"
            onClick={onCancel}
            className="bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-1.5 px-4 rounded-xl shadow-md transition-colors text-xs mr-1"
          >
            Cancelar solicitud
          </button>
        </div>
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold text-center text-black mb-10">
            Crea tu solicitud de trabajo
          </h1>

          <form action="/guardar-datos.php" method="POST" className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="titulo" className="text-sm text-gray-600 ml-1">Título de la solicitud</label>
              <input 
                type="text" 
                id="titulo" 
                name="titulo" 
                placeholder="Escribe el título de tu solicitud aquí" 
                required 
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="descripcion" className="text-sm text-gray-600 ml-1">Descripción de la solicitud</label>
              <textarea 
                id="descripcion" 
                name="descripcion" 
                placeholder="Escribe una descripción detallada de tu solicitud aquí" 
                required 
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ubicacion" className="text-sm text-gray-600 ml-1">Ubicación</label>
              <input 
                type="text" 
                id="ubicacion" 
                name="ubicacion" 
                placeholder="Escribe la ubicación de tu solicitud aquí" 
                required 
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="category" className="text-sm text-gray-600 ml-1">Categoría</label>
              <div className="relative">
                <select 
                  id="category" 
                  name="category" 
                  required 
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled hidden>Seleccionar categoria</option>
                  <option value="hogar">Hogar</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="construccion">Construcción</option>
                  <option value="tutoria">Tutoría</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs">
                  ▼
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="contractType" className="text-sm text-gray-600 ml-1">Tipo de contrato</label>
              <div className="relative">
                <select 
                  id="contractType" 
                  name="contractType" 
                  required 
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] appearance-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled hidden>Seleccionar tipo contrato</option>
                  <option value="por_hora">Por hora</option>
                  <option value="pago_unico">Pago único</option>
                  <option value="contrato_largo">Contrato largo</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs">
                  ▼
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="image" className="text-sm text-gray-600 ml-1">Imagen</label>
              <div className="relative">
                <input 
                  type="file" 
                  id="image" 
                  name="image" 
                  accept="image/*" 
                  required 
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4"
            >
              Publicar solicitud
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default PublicarSolicitud