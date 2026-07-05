import type { ReviewProfile } from "../../types";

import ReviewPerfilCard from "./ReviewPerfilCard";
import AddReview from "./AddReview";

interface ReviewProfileListProps {
  reviewsProfile: ReviewProfile[];
  pestañaActiva: string;
  onAddReview: (review: string, rating: number) => void;
  isOwner: boolean;
}

function ReviewProfile({ reviewsProfile, pestañaActiva, onAddReview, isOwner }: ReviewProfileListProps) {
  if (pestañaActiva !== "Opiniones") {
    return null;
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto">
        {reviewsProfile.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Aún no hay reseñas</h2>

            <p className="text-gray-500">
              Sé el primero en dejar una reseña para este trabajador.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Opiniones de clientes</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {reviewsProfile.map((review) => (
                <ReviewPerfilCard key={review.id} reviewProfile={review} />
              ))}
            </div>
          </>
        )}

        {/* No tiene sentido dejarte una reseña a ti mismo */}
        {!isOwner && <AddReview onAddReview={onAddReview} />}
      </div>
    </section>
  );
}

export default ReviewProfile;