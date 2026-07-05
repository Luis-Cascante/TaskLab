export interface GeneralInfo {
  aboutMe: string;
  degrees: string;
}

// Antes se llamaba "Review" y chocaba de nombre con el componente Review.tsx
export interface PortfolioItem {
  title: string;
  image: string;
  date: string;
  category: string;
  description: string;
  rating: number;
}

// Datos que sí ingresa el usuario al agregar un trabajo al portafolio.
// La fecha y la calificación las asigna el sistema, no se piden en el formulario.
export interface NewPortfolioItemData {
  title: string;
  description: string;
  category: string;
  image: string;
}

export interface ReviewProfile {
  id: string;
  idUser: string;
  image: string;
  name: string;
  rating: number;
  review: string;
}

export interface WorkInfo {
  profession: string;
  availability: boolean;
  rating: number;
  reviews: number;
  generalInfo: GeneralInfo;
  portfolio: PortfolioItem[];
  reviewsProfile: ReviewProfile[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  identificationNumber: string;
  address: string;
  phone: string;
  password: string;
  profilePicture: string;
  created_at: string;
  updated_at: string;
  workInfo?: WorkInfo;
}

// Reemplaza a las rutas de TanStack Router: ahora la "pantalla" activa
// es simplemente un valor de estado en memoria.
export type View = "register" | "perfil" | "edit-profile";

// --- Autenticación en memoria (sin backend) ---

// Resultado de intentar iniciar sesión o registrarse: o todo salió bien,
// o viene un mensaje de error para mostrarle al usuario en el formulario.
export type AuthResult = { ok: true } | { ok: false; error: string };

// Datos que recolecta el formulario de registro antes de convertirse en un User.
export interface RegisterFormValues {
  nombre: string;
  correo: string;
  cedula: string;
  password: string;
}

// Todas las "pantallas" de la app (reemplaza a las rutas de router).
// Se define una sola vez aquí para que App.tsx y Header.tsx (y cualquier
// otro componente que navegue) usen siempre el mismo conjunto de valores.
export type MainView =
  | "home"
  | "jobs"
  | "detail"
  | "workers"
  | "profile"
  | "edit-profile"
  | "add-portfolio-item"
  | "chat"
  | "publish"
  | "login"
  | "register";