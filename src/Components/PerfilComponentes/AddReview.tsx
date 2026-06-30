import { useState } from "react";

function AddReview() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    console.log({
      idUser: "USER_LOGGED_ID", // luego vendrá del login
      rating,
      review,
    });

    setRating(5);
    setReview("");
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

      <button
        onClick={handleSubmit}
        className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all float-right"
      >
        Enviar reseña
      </button>

    </div>
  );
}

export default AddReview;