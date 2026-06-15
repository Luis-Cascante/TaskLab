import type { worker } from "./PruebasWorkerData";
import WorkerCard from "./WorkerCard"

type TrabajadoresProps = {
    onOpenProfile?: () => void;
    Workers : worker[]
}

function Trabajadores({ onOpenProfile, Workers }: TrabajadoresProps) {
  const workers = [
    { name: "Juan Pepe", profession: "Fontanero", location: "Macacona, Esparza", rating: "4,5" },
    { name: "Ana Rojas", profession: "Mantenimiento", location: "Puntarenas", rating: "4,8" },
    { name: "Luis Vargas", profession: "Construcción", location: "Miramar", rating: "4,6" },
  ]

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
      <div className="mb-6 text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-900">Lista de trabajadores</h1>
        <p className="text-sm text-gray-600">Perfiles existentes dentro del mismo estilo visual del proyecto.</p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Workers.map((worker, index) => (
          <WorkerCard key={index} onOpenProfile={onOpenProfile} worker={worker} />
        ))}
      </section>
    </main>
  )
}

export default Trabajadores