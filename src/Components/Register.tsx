import { useState, type ChangeEvent, type FormEvent } from 'react'
import type { AuthResult, RegisterFormValues } from '../types'

type RegisterProps = {
  onChangeLogin?: () => void
  onRegister: (data: RegisterFormValues) => Promise<AuthResult>
}

interface RegisterFormState {
  nombre:   string
  correo:   string
  cedula:   string
  password: string
  terminos: boolean
}

const initialForm: RegisterFormState = {
  nombre:   '',
  correo:   '',
  cedula:   '',
  password: '',
  terminos: false,
}

const EMAIL_REGEX    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

function Register({ onChangeLogin, onRegister }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData]         = useState<RegisterFormState>(initialForm)
  const [error, setError]               = useState<string | null>(null)
  const [isLoading, setIsLoading]       = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const nombre = formData.nombre.trim()
    const correo = formData.correo.trim()
    const cedula = formData.cedula.trim()

    // Validaciones del lado cliente
    if (nombre.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.')
      return
    }
    if (!EMAIL_REGEX.test(correo)) {
      setError('Escribe un correo electrónico válido.')
      return
    }
    if (!/^\d{9}$/.test(cedula)) {
      setError('La cédula debe tener 9 dígitos numéricos (incluye los ceros).')
      return
    }
    if (!PASSWORD_REGEX.test(formData.password)) {
      setError('La contraseña debe tener al menos 8 caracteres, con una mayúscula, una minúscula, un número y un símbolo.')
      return
    }
    if (!formData.terminos) {
      setError('Debes aceptar los términos y condiciones.')
      return
    }

    setIsLoading(true)
    const result = await onRegister({ nombre, correo, cedula, password: formData.password })
    setIsLoading(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    setFormData(initialForm)
    // Si result.ok === true, App.tsx ya redirige a "home".
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">

      {/* Izquierda: Logo */}
      <section className="hidden md:flex md:w-1/2 bg-[#111e38] items-center justify-center p-12">
        <img
          src="src/assets/img/Logo_TaskLab.png"
          alt="Logo TaskLab"
          className="w-2/6 h-auto object-contain opacity-80"
        />
      </section>

      {/* Derecha: Formulario */}
      <section className="flex-1 bg-[#e5e7eb] flex flex-col items-center justify-center px-8 py-12 md:px-24">
        <div className="w-full max-w-sm">

          <h1 className="text-3xl font-bold text-center text-black mb-10">
            ¡Empieza ahora en tasklab!
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

            <div className="flex flex-col gap-1">
              <label htmlFor="nombre" className="text-sm text-gray-600 ml-1">Nombre completo</label>
              <input
                type="text" id="nombre" name="nombre"
                value={formData.nombre} onChange={handleChange}
                placeholder="Escribe tu nombre completo aquí"
                disabled={isLoading} required
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="correo" className="text-sm text-gray-600 ml-1">Correo electrónico</label>
              <input
                type="email" id="correo" name="correo"
                value={formData.correo} onChange={handleChange}
                placeholder="Escribe tu correo electrónico aquí"
                disabled={isLoading} required
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="cedula" className="text-sm text-gray-600 ml-1">Cedula</label>
              <input
                type="text" id="cedula" name="cedula"
                value={formData.cedula} onChange={handleChange}
                placeholder="Incluya los ceros de su cedula"
                inputMode="numeric" maxLength={9}
                disabled={isLoading} required
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-sm text-gray-600 ml-1">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password" name="password"
                  value={formData.password} onChange={handleChange}
                  placeholder="Contraseña"
                  disabled={isLoading} required
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] pr-12 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-600 cursor-pointer focus:outline-none"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
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
              <p className="text-xs text-gray-500 ml-1">
                Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
              </p>
            </div>

            <div className="flex items-start gap-2 mt-4">
              <input
                type="checkbox" id="terminos" name="terminos"
                checked={formData.terminos} onChange={handleChange}
                disabled={isLoading} required
                className="mt-1"
              />
              <label htmlFor="terminos" className="text-sm text-gray-600">
                Acepto los{' '}
                <a href="/terminos" className="text-amber-500 hover:underline">
                  términos y condiciones
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear cuenta'
              )}
            </button>
          </form>

          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-amber-400/50" />
            <span className="flex-shrink mx-4 text-[10px] text-gray-500 uppercase tracking-tighter">¿Ya tienes una cuenta?</span>
            <div className="flex-grow border-t border-amber-400/50" />
          </div>

          <div className="text-center text-sm text-gray-700 font-medium">
            Inicia sesión{' '}
            <button type="button" className="text-amber-500 hover:underline" onClick={onChangeLogin}>
              aquí
            </button>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Register