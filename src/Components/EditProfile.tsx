import { useState, type ChangeEvent } from 'react'
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
const PHONE_REGEX = /^\d{4}-?\d{4}$/

function EditProfile({ user, onSave, onCancel }: EditProfileProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview]             = useState(
    getImageUrl(user.profilePicture) || user.profilePicture || 'https://picsum.photos/200'
  )
  const [error, setError]       = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<EditProfileFormData>({
    name:         user.name,
    email:        user.email,
    newPassword:  '',
    phone:        user.phone    || '',
    address:      user.address  || '',
    profession:   user.workInfo?.profession          || '',
    availability: user.workInfo?.availability        ?? false,
    aboutMe:      user.workInfo?.generalInfo?.aboutMe || '',
    degrees:      user.workInfo?.generalInfo?.degrees || '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    const file = e.target.files[0]
    setSelectedImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    setError(null)

    const name  = formData.name.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim()

    if (name.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.')
      return
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Escribe un correo electrónico válido.')
      return
    }
    if (phone !== '' && !PHONE_REGEX.test(phone)) {
      setError('El teléfono debe tener 8 dígitos (ej. 8888-8888).')
      return
    }
    if (formData.newPassword !== '' && formData.newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }

    setIsLoading(true)

    const userResult = await userService.updateUser(user.id, {
      name,
      email,
      password: formData.newPassword || undefined,
    })

    if (!userResult.ok) {
      setError(userResult.error)
      setIsLoading(false)
      return
    }

    const profileResult = await userService.updateProfile(
      user.id,
      {
        description:  formData.aboutMe,
        address:      formData.address,
        phone:        formData.phone,
        profession:   formData.profession,
        titles:       formData.degrees,
        availability: formData.availability,
      },
      selectedImage
    )

    if (!profileResult.ok) {
      setError(profileResult.error)
      setIsLoading(false)
      return
    }

    const refreshResult = await userService.getUserById(user.id, user)

    if (!refreshResult.ok) {

      console.warn('No se pudo recargar el perfil:', refreshResult.error)
      const fallbackUser: User = {
        ...user,
        name,
        email,
        phone,
        address:      formData.address,
        profilePicture: preview,
        workInfo: {
          profession:   formData.profession,
          availability: formData.availability,
          rating:       user.workInfo?.rating   ?? 0,
          reviews:      user.workInfo?.reviews  ?? 0,
          generalInfo: {
            aboutMe: formData.aboutMe,
            degrees: formData.degrees,
          },
          portfolio:      user.workInfo?.portfolio      ?? [],
          reviewsProfile: user.workInfo?.reviewsProfile ?? [],
        },
      }
      setIsLoading(false)
      onSave(fallbackUser)
      return
    }

    setIsLoading(false)
    onSave(refreshResult.data)
  }

  return (
    <>
      <section className="bg-[#1d61a1] text-white pt-8 px-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center gap-6 pb-8">
          <img
            src={preview}
            alt="Perfil"
            className="w-24 h-24 rounded-full border-4 border-white object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold">Editar Perfil</h1>
            <p className="text-blue-200">Actualiza la información de tu perfil profesional.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-10 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md p-10 space-y-12">

          {error && (
            <div role="alert" className="rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          {/* ── Información Personal ────────────────────────────────────── */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Información Personal</h2>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Avatar */}
              <div className="md:col-span-2">
                <label className="block font-semibold text-gray-700 mb-4">Fotografía de perfil</label>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img
                    src={preview}
                    alt="Vista previa"
                    className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
                  />
                  <div>
                    <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <label htmlFor="profileImage" className="cursor-pointer bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-lg inline-block">
                      Cambiar fotografía
                    </label>
                    <p className="text-sm text-gray-500 mt-3">JPG, PNG o WEBP</p>
                  </div>
                </div>
              </div>

              {/* Campos de texto personales */}
              {([
                ['name',        'Nombre'],
                ['email',       'Correo'],
                ['newPassword', 'Nueva contraseña (opcional)'],
                ['phone',       'Teléfono'],
                ['address',     'Dirección'],
              ] as [keyof EditProfileFormData, string][]).map(([name, label]) => (
                <div key={name}>
                  <label className="font-semibold text-gray-700">{label}</label>
                  <input
                    name={name}
                    type={name === 'newPassword' ? 'password' : 'text'}
                    value={formData[name] as string}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder={name === 'newPassword' ? 'Dejar vacío para no cambiar' : ''}
                    className="mt-2 w-full border rounded-lg p-3 disabled:opacity-60"
                  />
                  {name === 'phone' && (
                    <p className="text-xs text-gray-500 mt-1">Formato: 8888-8888</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Información Profesional ─────────────────────────────────── */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Información Profesional</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-semibold text-gray-700">Profesión</label>
                <input
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="mt-2 w-full border rounded-lg p-3 disabled:opacity-60"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    name="availability"
                    checked={formData.availability}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  Disponible para trabajar
                </label>
              </div>

              {([
                ['aboutMe', 'Sobre mí',  5],
                ['degrees', 'Títulos',   4],
              ] as [keyof EditProfileFormData, string, number][]).map(([name, label, rows]) => (
                <div className="md:col-span-2" key={name}>
                  <label className="font-semibold text-gray-700">{label}</label>
                  <textarea
                    rows={rows}
                    name={name}
                    value={formData[name] as string}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="mt-2 w-full border rounded-lg p-3 disabled:opacity-60"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Botones ─────────────────────────────────────────────────── */}
          <div className="flex justify-end gap-4 border-t pt-8">
            <button
              className="px-8 py-3 rounded-lg bg-gray-300 hover:bg-gray-400 disabled:opacity-60"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </>
              ) : (
                'Guardar cambios'
              )}
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default EditProfile