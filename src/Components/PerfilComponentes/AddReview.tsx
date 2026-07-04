
import { useEffect, useState } from "react";
import { reviewsService } from "../../services/reviews"; // ajusta la ruta según tu proyecto
 
interface AddReviewProps {
  work_info_id?: string;
  onReviewAdded?: () => void; 
}
 
function AddReview({ work_info_id, onReviewAdded }: AddReviewProps) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
 
  const [formData, setFormData] = useState({
    work_info_id: "",
    rating: 5,
    review: "",
  });
  useEffect(() => {
    setFormData({
      work_info_id: work_info_id || "",
      rating: rating,
      review: review,
    });
  }, [work_info_id, rating, review]);
 
  const handleSubmit = async () => {
    if (!formData.work_info_id) {
      setError("No se pudo identificar al profesional a reseñar");
      return;
    }
 
    if (!formData.review.trim()) {
      setError("Escribe un comentario antes de enviar");
      return;
    }
 
    setSubmitting(true);
    setError(null);
    setSuccess(false);
 
    try {
      await reviewsService.addReview(formData);
 
      setSuccess(true);
      setRating(5);
      setReview("");
      onReviewAdded?.();
    } catch (err: any) {
      setError(err.response?.data?.message || "No se pudo enviar la reseña");
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <div className="mt-12 border-t pt-10">
 
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dejar una reseña
      </h2>
 
      {/* Calificación */}
 
      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-3">
          Calificación
        </label>
 
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="text-3xl"
            >
              {star <= rating ? "⭐" : "☆"}
            </button>
          ))}
        </div>
      </div>
 
      {/* Comentario */}
 
      <div className="mb-6">
        <label className="block font-semibold text-gray-700 mb-3">
          Comentario
        </label>
 
        <textarea
          rows={5}
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Escribe tu experiencia con este trabajador..."
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
        />
      </div>
 
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
 
      {success && (
        <p className="text-green-600 text-sm mb-4">¡Reseña enviada correctamente!</p>
      )}
 
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all float-right disabled:opacity-50"
      >
        {submitting ? "Enviando..." : "Enviar reseña"}
      </button>
 
    </div>
  );
}
 
export default AddReview;
 