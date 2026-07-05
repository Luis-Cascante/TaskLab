import type { PortfolioItem } from "../../types";

interface ReviewProps {
  review: PortfolioItem;
}

function Review({ review }: ReviewProps) {
  const hasRating = review.rating > 0;
  const stars = "⭐".repeat(review.rating);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md bg-[#1d61a1] group aspect-4/3">
      <img
        src={review.image}
        alt={review.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#1d61a1] via-[#1d61a1]/90 to-transparent pt-12 pb-4 px-4 text-white">
        <p className="text-xs text-gray-300 font-medium mb-1">
          {review.date} · {review.category}
        </p>
        <p className="text-lg font-bold tracking-wide mb-1">{review.title}</p>
        <p className="text-xs text-gray-100 font-light leading-relaxed mb-1.5 line-clamp-2">
          {review.description}
        </p>
        {hasRating ? (
          <p className="text-sm text-amber-400 font-semibold flex items-center gap-0.5">
            {stars}
          </p>
        ) : (
          <p className="text-xs text-gray-300 italic">Sin calificar aún</p>
        )}
      </div>
    </div>
  );
}

export default Review;