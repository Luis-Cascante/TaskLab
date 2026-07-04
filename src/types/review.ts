export interface ReviewDB{
    id: string;
    imageUrl: string;
    name: string;
    rating: number;
    review: string;
}

export interface ReviewData{
    work_info_id: string;
    rating: number;
    review: string;
}