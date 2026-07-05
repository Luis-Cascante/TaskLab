import type { User } from "../types";

// Dato inicial en memoria. No hay backend: esto es el "estado semilla"
// que App.tsx carga en su useState y que se puede editar en tiempo real
// desde EditProfile o desde el formulario de reseñas.
export const mockUser: User = {
  id: "1",
  name: "Carlos Rodríguez",
  email: "carlos@email.com",
  identificationNumber: "123456789",
  address: "San José, Costa Rica",
  phone: "8888-8888",
  password: "123456",
  profilePicture: "https://picsum.photos/id/58/600/600",
  created_at: "28 de junio de 2026",
  updated_at: "28 de junio de 2026",

  workInfo: {
    profession: "Electricista",
    availability: true,
    rating: 4.5,
    reviews: 56,
    generalInfo: {
      aboutMe:
        "Electricista con más de 12 años de experiencia en instalaciones residenciales, comerciales e industriales. Especializado en mantenimiento preventivo, cableado estructurado, tableros eléctricos y sistemas de iluminación LED. Mi objetivo es ofrecer soluciones seguras, eficientes y duraderas.",
      degrees:
        "Técnico en Electricidad\nCertificación en Instalaciones Residenciales\nCertificación en Mantenimiento Industrial\nCertificación en Seguridad Eléctrica",
    },
    portfolio: [
      {
        image: "https://picsum.photos/id/31/400/300",
        date: "2026-05-20",
        description: "Instalación completa de sistema eléctrico residencial.",
        rating: 5,
      },
      {
        image: "https://picsum.photos/id/32/400/300",
        date: "2026-06-01",
        description: "Renovación de tablero eléctrico comercial.",
        rating: 5,
      },
      {
        image: "https://picsum.photos/id/33/400/300",
        date: "2026-07-15",
        description: "Instalación de iluminación LED para oficinas.",
        rating: 4,
      },
    ],
    reviewsProfile: [
      {
        id: "1",
        idUser: "2",
        image: "https://picsum.photos/id/64/100/100",
        name: "María López",
        rating: 5,
        review: "Excelente servicio. Muy profesional y puntual.",
      },
      {
        id: "2",
        idUser: "3",
        image: "https://picsum.photos/id/65/100/100",
        name: "Juan Pérez",
        rating: 4,
        review: "Trabajo limpio y de calidad. Lo contrataría nuevamente.",
      },
      {
        id: "3",
        idUser: "4",
        image: "https://picsum.photos/id/66/100/100",
        name: "Ana Rodríguez",
        rating: 5,
        review: "Resolvió un problema eléctrico complicado en muy poco tiempo.",
      },
      {
        id: "4",
        idUser: "5",
        image: "https://picsum.photos/id/66/100/100",
        name: "Ana Rodríguez",
        rating: 5,
        review: "Resolvió un problema eléctrico complicado en muy poco tiempo.",
      },
    ],
  },
};
