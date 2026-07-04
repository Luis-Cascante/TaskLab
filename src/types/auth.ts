import type {UserDBAnwer } from './user';

export interface LoginCredentials {
    identification_number: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    user: UserDBAnwer;
    token: string;
}

export interface RegisterResponse {
  message: string;
  user: UserDBAnwer;
}

export interface RegisterData {
  name: string;
  email: string;
  identification_number: string;
  address: string;
  phone: string;
  password: string;
}

export interface AuthContextType {
  user: UserDBAnwer | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<UserDBAnwer>;
  logout: () => void;
  isLoading: boolean;
}