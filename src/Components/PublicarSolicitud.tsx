import { useState, useEffect } from "react"
import type { BackendTask, TaskCategory, TaskAgreement } from "../types"
import { categoryService } from "../services/categoryService"
import { getTaskImageUrl } from "../utils/media"

type PublicarSolicitudProps = {
  onCancel?: () => void
  onSubmit?: (formData: FormData) => Promise<{ ok: boolean; error?: string }>
  onUpdate?: (taskId: string, formData: FormData) => Promise<{ ok: boolean; error?: string }>
  onDelete?: (taskId: string) => Promise<{ ok: boolean; error?: string } | void> | void  // 👈 cambio aquí
  currentUserId: string
  currentUserName: string
  taskToEdit?: BackendTask
}

function PublicarSolicitud({
  onCancel,
  onSubmit,
  onUpdate,
  onDelete,
  taskToEdit,
}: PublicarSolicitudProps) {
  const isEditMode = !!taskToEdit

  const [titulo, setTitulo] = useState(taskToEdit?.title ?? "")
  const [descripcion, setDescripcion] = useState(taskToEdit?.description ?? "")
  const [ubicacion, setUbicacion] = useState(taskToEdit?.location ?? "")
  const [categoryId, setCategoryId] = useState(taskToEdit?.category.id ?? "")
  const [agreementId, setAgreementId] = useState(taskToEdit?.agreement.id ?? "")

  const [categories, setCategories] = useState<TaskCategory[]>([])
  const [agreements, setAgreements] = useState<TaskAgreement[]>([])
  const [isLoadingOptions, setIsLoadingOptions] = useState(true)
  const [optionsError, setOptionsError] = useState<string | null>(null)

  const [imagePreview, setImagePreview] = useState<string>(
    isEditMode ? getTaskImageUrl(taskToEdit?.image ?? null) : ""
  )
  const [imageFile, setImageFile] = useState<File | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      setIsLoadingOptions(true)
      setOptionsError(null)
      const [catsResult, agreementsResult] = await Promise.all([
        categoryService.getCategories(),
        categoryService.getAgreements(),
      ])
      if (catsResult.ok) setCategories(catsResult.categories)
      else setOptionsError(catsResult.error)

      if (agreementsResult.ok) setAgreements(agreementsResult.agreements)
      else setOptionsError((prev) => prev ?? agreementsResult.error)

      setIsLoadingOptions(false)
    })()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const buildFormData = () => {
    const formData = new FormData()
    formData.append("title", titulo)
    formData.append("description", descripcion)
    formData.append("location", ubicacion)
    formData.append("category_id", categoryId)
    formData.append("agreement_id", agreementId)
    if (imageFile) formData.append("image", imageFile)
    return formData
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    if (!categoryId || !agreementId) {
      setError("Selecciona una categoría y un tipo de contrato.")
      return
    }

    const formData = buildFormData()
    setIsSubmitting(true)

    const result = isEditMode && taskToEdit
      ? await onUpdate?.(taskToEdit.id, formData)
      : await onSubmit?.(formData)

    setIsSubmitting(false)

    if (result && !result.ok) {
      setError(result.error ?? "Ocurrió un error. Intenta de nuevo.")
    }
  }

  const handleDelete = async () => {
  if (!taskToEdit) return
  setIsSubmitting(true)
  const result = await onDelete?.(taskToEdit.id)
  setIsSubmitting(false)

  if (result && !result.ok) {
    setError(result.error ?? "No se pudo eliminar la solicitud.")
  }

}

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      <section className="hidden md:flex md:w-1/2 bg-[#111e38] items-center justify-center p-12">
        <img
          src="src/assets/img/Logo_TaskLab.png"
          alt="Logo TaskLab"
          className="w-2/6 h-auto object-contain opacity-80"
        />
      </section>

      <section className="flex-1 bg-[#e5e7eb] flex flex-col items-center justify-center px-8 py-12 md:px-24">
        <div className="w-full flex justify-end mb-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-1.5 px-4 rounded-xl shadow-md transition-colors text-xs mr-1 disabled:opacity-60"
          >
            Cancelar
          </button>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center text-black mb-10">
            {isEditMode ? "Editar tu solicitud de trabajo" : "Crea tu solicitud de trabajo"}
          </h1>

          {(error || optionsError) && (
            <div role="alert" className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error ?? optionsError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label htmlFor="titulo" className="text-sm text-gray-600 ml-1">Título de la solicitud</label>
              <input
                type="text" id="titulo" name="titulo" value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Escribe el título de tu solicitud aquí"
                minLength={3}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="descripcion" className="text-sm text-gray-600 ml-1">Descripción de la solicitud</label>
              <textarea
                id="descripcion" name="descripcion" value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Escribe una descripción detallada de tu solicitud aquí"
                disabled={isSubmitting}
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ubicacion" className="text-sm text-gray-600 ml-1">Ubicación</label>
              <input
                type="text" id="ubicacion" name="ubicacion" value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Escribe la ubicación de tu solicitud aquí"
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] disabled:opacity-60"
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="category" className="text-sm text-gray-600 ml-1">Categoría</label>
              <div className="relative">
                <select
                  id="category" name="category" value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  disabled={isSubmitting || isLoadingOptions}
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] appearance-none cursor-pointer disabled:opacity-60"
                >
                  <option value="" disabled hidden>
                    {isLoadingOptions ? "Cargando categorías..." : "Seleccionar categoría"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs">▼</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="agreement" className="text-sm text-gray-600 ml-1">Tipo de contrato</label>
              <div className="relative">
                <select
                  id="agreement" name="agreement" value={agreementId}
                  onChange={(e) => setAgreementId(e.target.value)}
                  required
                  disabled={isSubmitting || isLoadingOptions}
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] appearance-none cursor-pointer disabled:opacity-60"
                >
                  <option value="" disabled hidden>
                    {isLoadingOptions ? "Cargando tipos de contrato..." : "Seleccionar tipo de contrato"}
                  </option>
                  {agreements.map((agr) => (
                    <option key={agr.id} value={agr.id}>{agr.name}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs">▼</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-600 ml-1">
                Imagen {isEditMode && "(opcional: reemplaza la actual)"}
              </label>

              {imagePreview && (
                <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-300">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(""); setImageFile(null) }}
                    disabled={isSubmitting}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow disabled:opacity-60"
                  >
                    Quitar
                  </button>
                </div>
              )}

              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required={!isEditMode && !imagePreview}
                disabled={isSubmitting}
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent focus:outline-none focus:ring-2 focus:ring-[#1d61a1] disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoadingOptions}
              className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Guardando...
                </>
              ) : isEditMode ? "Guardar cambios" : "Publicar solicitud"}
            </button>

            {isEditMode && taskToEdit && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-xl border border-red-200 transition-colors disabled:opacity-60"
              >
                Eliminar solicitud
              </button>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}

export default PublicarSolicitud