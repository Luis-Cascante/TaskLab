import { useState } from "react"



function Register() {
const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
  
  {/* Sección Izquierda: Logo y Fondo Azul Oscuro */}
  <section className="hidden md:flex md:w-1/2 bg-[#111e38] items-center justify-center p-12">
    {/* Imagen del logo T central */}
    <img 
      src="src/assets/img/Logo_TaskLab.png" 
      alt="Logo TaskLab" 
      className="w-2/6 h-auto object-contain opacity-80" 
    />
  </section>

  {/* Sección Derecha: Formulario y Fondo Gris Claro */}
  <section className="flex-1 bg-[#e5e7eb] flex flex-col items-center justify-center px-8 py-12 md:px-24">
    <div className="w-full max-w-sm">
      
      <h1 className="text-3xl font-bold text-center text-black mb-10">
        ¡Empieza ahora en tasklab!
      </h1>

      <form action="/guardar-datos.php" method="POST" className="flex flex-col gap-4">
        
        {/* Campo Nombre */}
        <div className="flex flex-col gap-1">
          <label htmlFor="nombre" className="text-sm text-gray-600 ml-1">Nombre completo</label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre" 
            placeholder="Escribe tu nombre completo aquí" 
            required 
            className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
          />
        </div>

        {/* Campo Correo */}
        <div className="flex flex-col gap-1">
          <label htmlFor="correo" className="text-sm text-gray-600 ml-1">Correo electrónico</label>
          <input 
            type="email" 
            id="correo" 
            name="correo" 
            placeholder="Escribe tu correo electrónico aquí" 
            required 
            className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
          />
        </div>

        {/* Campo Cédula */}
        <div className="flex flex-col gap-1">
          <label htmlFor="cedula" className="text-sm text-gray-600 ml-1">Cedula</label>
          <input 
            type="text" 
            id="cedula" 
            name="cedula" 
            placeholder="Incluya los ceros de su cedula" 
            required 
            className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
          />
        </div>

        {/* Campo Contraseña */}
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="text-sm text-gray-600 ml-1">Contraseña</label>
          <div className="relative">
            <input 
              // El tipo cambia dinámicamente según el estado showPassword
              type={showPassword ? "text" : "password"} 
              id="password" 
              name="password" 
              placeholder="Contraseña" 
              required 
              className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] pr-12"
            />
            
            {/* Botón interactivo para alternar la visibilidad */}
            <button
              type="button" // Evita que este botón accidentalmente envíe el formulario
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-600 cursor-pointer focus:outline-none flex items-center justify-center"
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? (
                // Ícono de Ojo Abierto
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                // Ícono de Ojo Tachado (El de la app original)
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Casilla de aceptación de términos */ }
        <div className="flex items-start gap-2 mt-4">
          <input 
            type="checkbox" 
            id="terminos" 
            name="terminos" 
            required 
            className="mt-1"
          />
          <label htmlFor="terminos" className="text-sm text-gray-600">
            Acepto los <a href="/terminos" className="text-amber-500 hover:underline">términos y condiciones</a>
          </label>
        </div>

        {/* Botón de Iniciar Sesión */}
        <button 
          type="submit" 
          className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4"
        >
          Crear cuenta
        </button>
      </form>

      {/* Divisor con texto inferior */}
      <div className="relative flex py-8 items-center">
        <div className="flex-grow border-t border-amber-400/50"></div>
        <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase tracking-tighter">¿Ya tienes una cuenta?</span>
        <div className="flex-grow border-t border-amber-400/50"></div>
      </div>

      <div className="text-center text-sm text-gray-700 font-medium">
        Inicia sesión <a href="/login" className="text-amber-500 hover:underline">aquí</a>
      </div>

    </div>
  </section>
</div>
    </>
  )
}

export default Register
