import type { ReviewDB } from "../../types/review";

import ReviewPerfilCard from "./ReviewPerfilCard";

import AddReview from "./AddReview";
import { useEffect, useState } from "react";
import { reviewsService } from "../../services/reviews";

interface ReviewProfileProps {
  work_info_id?: string;
  pestañaActiva: string;
  isOwner: boolean;
  userId: string;
}

function ReviewProfile({ work_info_id, pestañaActiva, isOwner, userId }: ReviewProfileProps) {

  const [reviews, setReviews] = useState<ReviewDB[]>([]);
  const fetchReviews = () => {
    reviewsService.getReviewsByUserId(userId).then(setReviews);
  };
  useEffect(() => {
    fetchReviews();
  }, [userId]);


  if (pestañaActiva !== "Opiniones") {

    return null;
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto">

        {reviews?.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Aún no hay reseñas
            </h2>

            <p className="text-gray-500">
              Sé el primero en dejar una reseña para este trabajador.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Opiniones de clientes
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews?.map((review) => (
                <ReviewPerfilCard
                  key={review.id}
                  review={review}
                />
              ))}
            </div>
          </>
        )}
        {!isOwner && (
          <AddReview work_info_id={work_info_id} onReviewAdded={fetchReviews} />
        )}

      </div>
    </section>
  );
}

export default ReviewProfile;