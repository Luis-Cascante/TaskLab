import type { ReviewProfile } from "../../types";

interface ReviewProfileProps {
  reviewProfile: ReviewProfile;
}

function ReviewPerfilCard({ reviewProfile }: ReviewProfileProps) {
  const stars = "⭐".repeat(reviewProfile.rating);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={reviewProfile.image}
            alt={reviewProfile.name}
            className="w-10 h-10 rounded-full object-cover bg-gray-200 ring-2 ring-gray-50"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm">{reviewProfile.name}</p>
            <p className="text-xs text-amber-400 flex gap-0.5 mt-0.5">{stars}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed font-light">
          {reviewProfile.review}
        </p>
      </div>
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-50">
        <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <button className="text-gray-400 hover:text-green-500 transition-colors p-1 flex items-center gap-1 text-xs font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>Útil</span>
        </button>
      </div>
    </div>
  );
}

export default ReviewPerfilCard;
