import type { PortfolioItem } from "../../types/user";
import PortfolioItemCard from './PortfolioItem';


interface PortafolioProps {
    portfolioItems: PortfolioItem[] | undefined;
    pestañaActiva: string;
}

function Portafolio({ portfolioItems, pestañaActiva }: PortafolioProps) {
  if (pestañaActiva !== 'Portafolio') {
    return null; 
  }else {
    return (
      <>
        {/* Sección del Portafolio: Cuadrícula de proyectos */}
        <section className="bg-white py-12 px-4 md:px-12 max-w-7xl mx-auto">
          
          {/* Contenedor Grid: Configurado a 3 columnas en pantallas medianas/grandes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {portfolioItems?.map((item, index) => (
              < PortfolioItemCard 
                key={index}
                review={item}
              />
            ))}

          </div>
        </section>
      </>
    );
  }
}

export default Portafolio;

