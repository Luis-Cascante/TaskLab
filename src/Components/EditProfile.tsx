import { useState, useEffect, type ChangeEvent } from 'react'
import type { User } from '../types'
import { userService, getImageUrl } from '../services/userService'

interface EditProfileProps {
  user:     User
  onSave:   (updatedUser: User) => void
  onCancel: () => void
}

interface EditProfileFormData {
  name:         string
  email:        string
  newPassword:  string
  phone:        string
  address:      string
  profession:   string
  availability: boolean
  aboutMe:      string
  degrees:      string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EditProfile({ user, onSave, onCancel }: EditProfileProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview]             = useState(
    getImageUrl(user.profilePicture) || user.profilePicture || 'https://picsum.photos/200'
  )
  const [error, setError]       = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  // Estado para guardar las vocaciones reales de la Base de Datos
  const [vocaciones, setVocaciones] = useState<Array<{ id: string; name: string }>>([])

  const [formData, setFormData] = useState<EditProfileFormData>({
    name:         user.name,
    email:        user.email,
    newPassword:  '',
    phone:        user.phone        || '',
    address:      user.address      || '',
    profession:   user.workInfo?.profession || '',
    availability: user.workInfo?.availability ?? true,
    aboutMe: user.workInfo?.generalInfo?.aboutMe || '',
degrees: user.workInfo?.generalInfo?.degrees || '',
  })

  // Cargar las vocaciones al montar el componente
  useEffect(() => {
    async function cargarVocaciones() {
      const res = await userService.getAvailableVocations()
      if (res.ok && res.data) {
        setVocaciones(res.data)
      } else if (!res.ok) {
        console.error(res.error)
      }
    }
    cargarVocaciones()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, availability: e.target.checked }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    setError(null)
    
    // Validaciones básicas de front
    if (!formData.name.trim()) return setError('El nombre es obligatorio.')
    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email)) {
      return setError('Por favor introduce un correo electrónico válido.')
    }
    if (formData.newPassword && formData.newPassword.length < 6) {
      return setError('La nueva contraseña debe tener al menos 6 caracteres.')
    }

    setIsLoading(true)
    try {
      // 1️⃣ Enviar datos de cuenta (PUT /users/:id)
      const cuentaData: { name: string; email: string; password?: string } = {
        name:  formData.name,
        email: formData.email,
      }
      if (formData.newPassword.trim()) {
        cuentaData.password = formData.newPassword
      }

      const resCuenta = await userService.updateUserBasic(user.id, cuentaData)
      if (!resCuenta.ok) throw new Error(resCuenta.error || 'Error al actualizar datos de cuenta')

      // 2️⃣ Enviar datos profesionales + Avatar (PATCH /users/:id/profile)
      const resPerfil = await userService.updateProfile(user.id, {
        description:  formData.aboutMe,
        address:      formData.address,
        phone:        formData.phone,
        profession:   formData.profession, // Almacena la vocación seleccionada
        titles:       formData.degrees,
        availability: formData.availability
      }, selectedImage || undefined)

      if (!resPerfil.ok) throw new Error(resPerfil.error || 'Error al actualizar perfil profesional')

      // 3️⃣ Reconstruir estado local sincronizado para actualizar UI inmediatamente
      const updatedUser: User = {
        ...user,
        name:  formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        profilePicture: selectedImage ? preview : user.profilePicture,
        workInfo: {
          profession:   formData.profession,
          availability: formData.availability,
          rating:       user.workInfo?.rating ?? 0,
          reviews:      user.workInfo?.reviews ?? 0,
          generalInfo: {
            aboutMe: formData.aboutMe,
            degrees: formData.degrees,
          },
          portfolio:      user.workInfo?.portfolio ?? [],
          reviewsProfile: user.workInfo?.reviewsProfile ?? [],
        },
      }

      onSave(updatedUser)

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado al guardar.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-gray-100 py-12 px-4 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 flex flex-col gap-8">
        
        <div className="border-b pb-4">
          <h2 className="text-3xl font-bold text-[#111e38]">Editar Perfil</h2>
          <p className="text-gray-500 mt-1">Actualiza tu información real de cuenta y portafolio profesional.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200 text-sm font-medium">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna Izquierda: Avatar */}
          <div className="flex flex-col items-center gap-4 border-r pr-0 md:pr-8 border-gray-200">
            <div className="w-40 h-40 rounded-full overflow-hidden shadow-md border-4 border-gray-200 relative group">
              <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
              <label className="absolute inset-0 bg-black/50 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer font-semibold">
                Cambiar foto
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isLoading} />
              </label>
            </div>
            <p className="text-xs text-gray-400 text-center">Formatos permitidos: JPG, PNG. Máx 2MB.</p>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <h3 className="text-lg font-bold text-[#1d61a1] border-b pb-2">Información de Cuenta</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Nombre Completo</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} disabled={isLoading} className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Correo Electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={isLoading} className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Nueva Contraseña (Dejar en blanco para conservar actual)</label>
                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} disabled={isLoading} className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Mínimo 6 caracteres" />
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#1d61a1] border-b pb-2 mt-4">Perfil Profesional</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} disabled={isLoading} className="mt-1 w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>

              {/* 🛠️ MENÚ DESPLEGABLE DINÁMICO DE VOCACIONES */}
              <div>
                <label className="text-sm font-semibold text-gray-700">Profesión / Vocación</label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-1 w-full border rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  <option value="">Selecciona tu oficio principal...</option>
                  {vocaciones.map(voc => (
                    <option key={voc.id} value={voc.name}>
                      {voc.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Dirección de residencia</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} disabled={isLoading} className="mt-1 w-full border rounded-lg p-3 outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Títulos o Certificaciones obtenidos</label>
                <input type="text" name="degrees" value={formData.degrees} onChange={handleChange} disabled={isLoading} className="mt-1 w-full border rounded-lg p-3 outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Biografía / Acerca de mí</label>
                <textarea name="aboutMe" value={formData.aboutMe} onChange={handleChange} disabled={isLoading} rows={3} className="mt-1 w-full border rounded-lg p-3 outline-none" />
              </div>
              
              <div className="sm:col-span-2 flex items-center gap-3 mt-2">
                <input type="checkbox" id="availability" checked={formData.availability} onChange={handleCheckboxChange} disabled={isLoading} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 accent-[#1d61a1]" />
                <label htmlFor="availability" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">Me encuentro disponible para contratación inmediata</label>
              </div>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 border-t pt-6">
          <button className="px-6 py-2.5 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium disabled:opacity-60" onClick={onCancel} disabled={isLoading}>
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={isLoading} className="px-6 py-2.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold disabled:opacity-60 flex items-center gap-2">
            {isLoading ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>

      </div>
    </section>
  )
}