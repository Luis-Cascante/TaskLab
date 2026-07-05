import { useState, type FormEvent } from "react"
import type { AuthResult } from "../types"

type LoginProps = {
  onChangeRegister?: () => void
  onLogin: (cedula: string, password: string) => AuthResult
}

function Login({ onChangeRegister, onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [cedula, setCedula] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedCedula = cedula.trim()

    if (!/^\d{9}$/.test(trimmedCedula)) {
      setError("La cédula debe tener 9 dígitos numéricos.")
      return
    }

    if (password.length === 0) {
      setError("Escribe tu contraseña.")
      return
    }

    // La validación real (¿existe esa cédula? ¿coincide la contraseña?)
    // vive en App.tsx, que es quien tiene el registro de cuentas en memoria.
    const result = onLogin(trimmedCedula, password)
    if (!result.ok) {
      setError(result.error)
      return
    }

    setError(null)
  }

  return (
    <>
      <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">

        {/* Sección Izquierda: Logo y Fondo Azul Oscuro */}
        <section className="hidden md:flex md:w-1/2 bg-[#111e38] items-center justify-center p-12">
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
              ¡Bienvenido a tasklab!
            </h1>

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

              {/* Campo Cédula */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cedula" className="text-sm text-gray-600 ml-1">Cedula</label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="Escribe tu cedula aquí"
                  inputMode="numeric"
                  maxLength={9}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
                />
              </div>

              {/* Campo Contraseña */}
              <div className="flex flex-col gap-1 relative">
                <label htmlFor="password" className="text-sm text-gray-600 ml-1">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-600 cursor-pointer focus:outline-none flex items-center justify-center"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
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

              <button
                type="submit"
                className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4"
              >
                Iniciar sesión
              </button>
            </form>

            <div className="relative flex py-8 items-center">
              <div className="flex-grow border-t border-amber-400/50"></div>
              <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase tracking-tighter">¿No tienes cuenta?</span>
              <div className="flex-grow border-t border-amber-400/50"></div>
            </div>

            <div className="text-center text-sm text-gray-700 font-medium">
              crear una cuenta{" "}
              <button
                type="button"
                className="text-amber-500 hover:underline"
                onClick={onChangeRegister}
              >
                aquí
              </button>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}

export default Login