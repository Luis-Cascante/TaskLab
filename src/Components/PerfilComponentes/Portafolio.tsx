import Review from "./Review";
import type { PortfolioItem } from "../../types";

interface PortafolioProps {
  portfolioItems: PortfolioItem[];
  pestañaActiva: string;
  isOwner: boolean;
  onAddPortfolioItem: () => void;
}

function Portafolio({ portfolioItems, pestañaActiva, isOwner, onAddPortfolioItem }: PortafolioProps) {
  if (pestañaActiva !== "Portafolio") {
    return null;
  }

  return (
    <section className="bg-white py-12 px-4 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Portafolio</h2>

        {isOwner && (
          <button
            type="button"
            onClick={onAddPortfolioItem}
            className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-2 px-6 rounded-lg text-sm shadow-md transition-all"
          >
            + Agregar trabajo
          </button>
        )}
      </div>

      {portfolioItems.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Aún no hay trabajos en el portafolio
          </h3>
          <p className="text-gray-500">
            {isOwner
              ? "Agrega tu primer trabajo para que otros usuarios vean tu experiencia."
              : "Este trabajador todavía no ha agregado trabajos a su portafolio."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <Review key={index} review={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Portafolio;