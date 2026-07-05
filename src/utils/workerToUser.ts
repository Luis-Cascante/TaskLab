import type { worker } from "../Components/PruebasWorkerData";
import type { User } from "../types";

// Los "workers" de PruebasWorkerData.ts tienen una forma mucho más simple
// que User (sin email, phone, address, portfolio, reseñas, etc.).
// Esta función rellena esos campos con valores por defecto para poder
// reutilizar PerfilUser / EditProfile / ReviewsPerfil sin cambiarles el tipo.
//
// Se usa el prefijo "worker-" en el id para que nunca choque con el id
// del usuario logueado (mockUser), que también podría ser "1".
export function workerToUser(w: worker): User {
  const slug = w.name.toLowerCase().replace(/\s+/g, ".");

  return {
    id: `worker-${w.id}`,
    name: w.name,
    email: `${slug}@tasklab.com`,
    identificationNumber: "",
    address: w.location,
    phone: "",
    password: "",
    profilePicture: `https://picsum.photos/seed/worker-${w.id}/600/600`,
    created_at: "2026",
    updated_at: "2026",
    workInfo: {
      profession: w.profession,
      availability: true,
      rating: w.rating,
      reviews: 0,
      generalInfo: {
        aboutMe: w.description,
        degrees: `Experiencia profesional en ${w.profession.toLowerCase()}`,
      },
      portfolio: [],
      reviewsProfile: [],
    },
  };
}