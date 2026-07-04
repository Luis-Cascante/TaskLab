  import { apiClient } from './api';
  import type { User } from '../types/user';

  export const userService = {
    async getUser(id: string | null, signal?: AbortSignal): Promise<User> {
      const response = await apiClient.get<User>(`/users/${id}`, {
        signal,
      });
      return response.data;
    },

    async updateUser(
      id: string | null,
      userData: Partial<User>,
      profilePicture?: File | null
    ): Promise<User> {
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      formData.append(key, String(value));
    });

    if (profilePicture) {
      formData.append("profile_picture", profilePicture);
    }

    const response = await apiClient.patch<User>(`/users/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }




}
