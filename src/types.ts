export interface GeneralInfo {
  aboutMe: string;
  degrees: string;
}

export interface PortfolioItem {
  title: string;
  image: string;
  date: string;
  category: string;
  description: string;
  rating: number;
}

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

export type View = "register" | "perfil" | "edit-profile";

export type AuthResult = { ok: true } | { ok: false; error: string };

export interface RegisterFormValues {
  nombre: string;
  correo: string;
  cedula: string;
  password: string;
}

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

export type ApplicationStatus = "pendiente" | "rechazado" | "contratado";

export interface TaskCategory {
  id: string
  name: string
}

export interface TaskAgreement {
  id: string
  name: string
}

export interface EmployerProfile {
  avatar: string | null
  address: string | null
  profession: string | null
  availability: boolean | null
  rating: number | null
}

export interface TaskEmployer {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
  profile: EmployerProfile | null
}

export interface BackendTask {
  id: string
  title: string
  description: string | null
  location: string
  image: string | null
  employer: TaskEmployer
  employer_id: string
  category: TaskCategory
  category_id: string
  agreement: TaskAgreement
  agreement_id: string
  created_at: string
  updated_at: string
}

export interface BackendTaskRaw {
  id: string
  title: string
  description: string | null
  location: string
  image: string | null
  employer_id: string
  category_id: string
  agreement_id: string
  created_at: string
  updated_at: string
}

export type BackendApplicationStatus = 'pending' | 'accepted' | 'rejected'

export interface BackendApplication {
  id: string
  task_id: string
  applicant_id: string
  status: BackendApplicationStatus
  created_at: string
  updated_at: string
}

export interface BackendApplicationWithApplicant extends BackendApplication {
  applicant: {
    id: string
    name: string
    email: string
    created_at: string
    updated_at: string
    profile: { avatar: string | null; profession: string | null; address: string | null; rating: number | null } | null
    vocations: Array<{ vocation: { name: string } }>
  }
}

export interface BackendApplicationWithTask extends BackendApplication {
  task: BackendTask
}

export interface Application {
  taskId: string;        
  applicantId: string;
  applicantName: string;
  applicantImage: string;
  status: ApplicationStatus;
  applicationId: string; 
}