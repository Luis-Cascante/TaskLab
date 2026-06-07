<div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
  
  {/* Sección Izquierda: Logo y Fondo Azul Oscuro */}
  <section className="hidden md:flex md:w-1/2 bg-[#111e38] items-center justify-center p-12">
    {/* Imagen del logo T central */}
    <img 
      src="/assets/login.png" 
      alt="Logo TaskLab" 
      className="w-2/3 h-auto object-contain opacity-80" 
    />
  </section>

  {/* Sección Derecha: Formulario y Fondo Gris Claro */}
  <section className="flex-1 bg-[#e5e7eb] flex flex-col items-center justify-center px-8 py-12 md:px-24">
    <div className="w-full max-w-sm">
      
      <h1 className="text-2xl font-bold text-center text-black mb-10">
        ¡Bienvenido a tasklab!
      </h1>

      <form action="/guardar-datos.php" method="POST" className="flex flex-col gap-4">
        
        {/* Campo Cédula */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cedula" className="text-sm text-gray-600 ml-1">Cedula</label>
          <input 
            type="text" 
            id="cedula" 
            name="cedula" 
            placeholder="Escribe tu cedula aquí" 
            required 
            className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
          />
        </div>

        {/* Campo Contraseña */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="text-sm text-gray-600 ml-1">Contraseña</label>
          <div className="relative">
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Contraseña" 
              required 
              className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
            />
            {/* Icono de ojo simulado (puedes usar un SVG de Lucide o FontAwesome) */}
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 cursor-pointer">
              👁️
            </span>
          </div>
        </div>

        {/* Botón de Iniciar Sesión */}
        <button 
          type="submit" 
          className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4"
        >
          Iniciar sesión
        </button>
      </form>

      {/* Divisor con texto inferior */}
      <div className="relative flex py-8 items-center">
        <div className="flex-grow border-t border-amber-400/50"></div>
        <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase tracking-tighter">¿No tienes cuenta?</span>
        <div className="flex-grow border-t border-amber-400/50"></div>
      </div>

      <div className="text-center text-sm text-gray-700 font-medium">
        crear una cuenta <a href="/registro" className="text-amber-500 hover:underline">aquí</a>
      </div>

    </div>
  </section>
</div>