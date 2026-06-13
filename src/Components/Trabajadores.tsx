function Trabajadores() {
  const workers = [
    { name: "Juan Pepe", role: "Fontanero", location: "Macacona, Esparza", rating: "4,5" },
    { name: "Ana Rojas", role: "Mantenimiento", location: "Puntarenas", rating: "4,8" },
    { name: "Luis Vargas", role: "Construcción", location: "Miramar", rating: "4,6" },
  ]

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-900">Lista de trabajadores</h1>
        <p className="text-sm text-gray-600">Perfiles existentes dentro del mismo estilo visual del proyecto.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {workers.map((worker) => (
          <article key={worker.name} className="rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden">
            <div className="h-24 bg-[#1d61a1]" />
            <div className="p-5 -mt-10">
              <div className="w-20 h-20 rounded-2xl border-4 border-white bg-gray-300 shadow-md overflow-hidden">
                <img src="" alt={worker.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="mt-4 text-lg font-bold text-gray-900">{worker.name}</h2>
              <p className="text-sm text-[#1d61a1] font-semibold">{worker.role}</p>
              <p className="text-sm text-gray-600 mt-2">{worker.location}</p>
              <p className="text-sm text-amber-500 font-semibold mt-2">⭐ {worker.rating}</p>
              <button type="button" className="mt-4 w-full rounded-xl bg-[#111e38] text-white py-2 text-sm font-semibold hover:bg-[#1a2e54] transition-colors">
                Ver perfil
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Trabajadores