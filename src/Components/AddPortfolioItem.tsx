import { useState, type ChangeEvent, type FormEvent } from "react"
import type { NewPortfolioItemData } from "../types"

type AddPortfolioItemProps = {
  onCancel?: () => void
  onSubmit?: (item: NewPortfolioItemData) => void
}

const categoryOptions = [
  { value: "hogar", label: "Hogar" },
  { value: "mantenimiento", label: "Mantenimiento" },
  { value: "construccion", label: "Construcción" },
  { value: "tutoria", label: "Tutoría" },
  { value: "otro", label: "Otro" },
]

function AddPortfolioItem({ onCancel, onSubmit }: AddPortfolioItemProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return
    const file = event.target.files[0]
    setSelectedImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (trimmedTitle.length < 3) {
      setError("El título debe tener al menos 3 caracteres.")
      return
    }

    if (trimmedDescription.length < 10) {
      setError("Describe el trabajo con al menos 10 caracteres.")
      return
    }

    if (!category) {
      setError("Selecciona una categoría.")
      return
    }

    setError(null)

    console.log("Imagen seleccionada (no se sube a ningún lado):", selectedImage)

    onSubmit?.({
      title: trimmedTitle,
      description: trimmedDescription,
      category: categoryOptions.find((c) => c.value === category)?.label ?? category,
      // Sin imagen: se usa un placeholder consistente en vez de dejarlo vacío.
      image: preview ?? `https://picsum.photos/seed/portfolio-${Date.now()}/400/300`,
    })
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
            className="bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-1.5 px-4 rounded-xl shadow-md transition-colors text-xs mr-1"
          >
            Cancelar
          </button>
        </div>

        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-center text-black mb-2">
            Agregar trabajo al portafolio
          </h1>
          <p className="text-sm text-gray-600 text-center mb-8">
            La fecha y la calificación se asignan automáticamente.
          </p>

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
              <label htmlFor="title" className="text-sm text-gray-600 ml-1">Título del trabajo</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ej. Instalación eléctrica residencial"
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm text-gray-600 ml-1">Descripción</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe brevemente en qué consistió el trabajo"
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
              />
            </div>

            <div className="flex flex-col gap-1 relative">
              <label htmlFor="category" className="text-sm text-gray-600 ml-1">Categoría</label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1] appearance-none cursor-pointer"
                >
                  <option value="" disabled hidden>Seleccionar categoria</option>
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-xs">
                  ▼
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="image" className="text-sm text-gray-600 ml-1">
                Imagen de referencia <span className="text-gray-400">(opcional)</span>
              </label>

              {preview && (
                <img
                  src={preview}
                  alt="Vista previa del trabajo"
                  className="w-full h-40 object-cover rounded-xl border border-gray-300 mb-2"
                />
              )}

              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-400 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2.5 rounded-xl shadow-md transition-colors mt-4"
            >
              Guardar en el portafolio
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default AddPortfolioItem
