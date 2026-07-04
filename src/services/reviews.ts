import { apiClient } from './api';
import type { ReviewDB, ReviewData } from '../types/review';



export const reviewsService = {

    async getReviewsByUserId(userId: string | null, signal?: AbortSignal): Promise<ReviewDB[]> {
        const response = await apiClient.get<ReviewDB[]>(`/reviews/${userId}`, {
            signal,
        });
        return response.data;
    },

    async addReview(reviewData: { work_info_id: string; rating: number; review: string }): Promise<ReviewData> {
        const response = await apiClient.post<ReviewData>('/reviews', reviewData);
        return response.data;
    }
};


