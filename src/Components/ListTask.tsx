import { useMemo, useState } from "react"
import TaskCard from "../Components/TaskCard"
import type { task } from "./PruebasTaskData"

type ListTaskProps = {
  onOpenTask?: (task: task) => void
  onPublish?: () => void
  Tasks: task[]
}

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()

function ListTask({ Tasks, onOpenTask, onPublish }: ListTaskProps) {
  const [searchText, setSearchText] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAgreements, setSelectedAgreements] = useState<string[]>([])

  const categories = useMemo(
    () => Array.from(new Set(Tasks.map((task) => task.category))),
    [Tasks],
  )

  const agreements = useMemo(
    () => Array.from(new Set(Tasks.map((task) => task.agreement))),
    [Tasks],
  )

  const filteredTasks = useMemo(() => {
    const normalizedSearch = normalizeText(searchText)
    const normalizedCategories = selectedCategories.map(normalizeText)
    const normalizedAgreements = selectedAgreements.map(normalizeText)

    return Tasks.filter((task) => {
      const matchesSearch = normalizedSearch === "" || [
        task.title,
        task.employer,
        task.description,
        task.location,
        task.category,
        task.agreement,
      ].some((field) => normalizeText(field).includes(normalizedSearch))

      const matchesCategory =
        normalizedCategories.length === 0 ||
        normalizedCategories.includes(normalizeText(task.category))

      const matchesAgreement =
        normalizedAgreements.length === 0 ||
        normalizedAgreements.includes(normalizeText(task.agreement))

      return matchesSearch && matchesCategory && matchesAgreement
    })
  }, [Tasks, searchText, selectedCategories, selectedAgreements])

  const toggleFilter = (
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setSelectedValues(
      selectedValues.includes(value)
        ? selectedValues.filter((selectedValue) => selectedValue !== value)
        : [...selectedValues, value],
    )
  }

  const clearFilters = () => {
    setSearchText("")
    setSelectedCategories([])
    setSelectedAgreements([])
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6 relative">
        <h1 className="text-3xl font-bold text-gray-800 absolute left-1/2 transform -translate-x-1/2 hidden sm:block">
          Trabajos Publicados
        </h1>
        <h1 className="text-2xl font-bold text-gray-800 sm:hidden">
          Trabajos
        </h1>

        <button
          type="button"
          onClick={onPublish}
          className="ml-auto bg-[#1d61a1] hover:bg-[#154675] text-white font-semibold py-2 px-6 rounded-xl shadow-md transition-colors flex items-center gap-1 text-sm"
        >
          + Publicar solicitud
        </button>
      </div>

      <div className="bg-[#f59e0b] p-3 rounded-2xl shadow-lg">
        <div className="w-full flex gap-2 mb-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Buscar por título, ubicación, categoría o contrato..."
              className="w-full pl-4 pr-12 py-2 rounded-xl bg-[#e5e7eb] border-none text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1d61a1]"
            />
            <button type="button" className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#1d61a1] hover:bg-[#154675] text-white p-1.5 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4">
          <aside className="bg-[#111e38] text-white p-5 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-3 border-b border-gray-700 pb-2">
              <h4 className="text-xl font-bold text-[#f59e0b] tracking-wide">
                Filtros
              </h4>
              {(searchText || selectedCategories.length > 0 || selectedAgreements.length > 0) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-bold text-white hover:text-[#f59e0b] transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <h5 className="text-base font-bold text-[#f59e0b]">Categorías</h5>
              <div className="flex flex-col gap-2.5 pl-1">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-3 text-sm font-semibold cursor-pointer select-none hover:text-gray-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                      className="w-4 h-4 rounded text-[#1d61a1] focus:ring-0 cursor-pointer accent-[#1d61a1]"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h5 className="text-base font-bold text-[#f59e0b]">Contrato</h5>
              <div className="flex flex-col gap-2.5 pl-1">
                {agreements.map((agreement) => (
                  <label key={agreement} className="flex items-center gap-3 text-sm font-semibold cursor-pointer select-none hover:text-gray-300 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedAgreements.includes(agreement)}
                      onChange={() => toggleFilter(agreement, selectedAgreements, setSelectedAgreements)}
                      className="w-4 h-4 rounded text-[#1d61a1] focus:ring-0 cursor-pointer accent-[#1d61a1]"
                    />
                    {agreement}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section className="md:col-span-3 flex flex-col gap-4 bg-[#e5e7eb] p-4">
            <p className="text-sm font-semibold text-gray-700">
              {filteredTasks.length} resultado{filteredTasks.length === 1 ? "" : "s"} encontrado{filteredTasks.length === 1 ? "" : "s"}
            </p>

            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} onOpenTask={() => onOpenTask?.(task)} />
              ))
            ) : (
              <div className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-sm">
                No hay trabajos que coincidan con los filtros seleccionados.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default ListTask
