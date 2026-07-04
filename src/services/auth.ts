import { apiClient } from './api';
import type { LoginCredentials, LoginResponse, RegisterResponse, RegisterData } from '../types/auth';


export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },


async register(data: RegisterData): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>('/auth/register', data);
    return response.data;
  },


  
};


