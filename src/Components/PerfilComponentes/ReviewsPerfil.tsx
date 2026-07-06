import { useState } from 'react'
import type { ReviewProfile } from '../../types'
import ReviewPerfilCard from './ReviewPerfilCard'
import AddReview from './AddReview'

interface ReviewProfileListProps {
  reviewsProfile: ReviewProfile[]
  pestañaActiva:  string
  workerId:       string          
  currentUserId:  string         
  isOwner:        boolean
  onAddReview:    (review: string, rating: number) => Promise<void>
  onDeleteReview: (reviewId: string) => Promise<void>
}

function ReviewProfile({
  reviewsProfile,
  pestañaActiva,
  workerId,
  currentUserId,
  isOwner,
  onAddReview,
  onDeleteReview,
}: ReviewProfileListProps) {

  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (pestañaActiva !== 'Opiniones') return null

  const handleDelete = async (reviewId: string) => {
    setDeletingId(reviewId)
    await onDeleteReview(reviewId)
    setDeletingId(null)
  }

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto">
        {reviewsProfile.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Aún no hay reseñas</h2>
            <p className="text-gray-500">Sé el primero en dejar una reseña para este trabajador.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Opiniones de clientes</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {reviewsProfile.map((review) => {
                const isOwnReview = review.idUser === currentUserId

                return (
                  <div key={review.id} className="relative">
                    <ReviewPerfilCard reviewProfile={review} />

                    {/* Botón eliminar — solo en reseñas propias, nunca en el perfil ajeno */}
                    {isOwnReview && !isOwner && (
                      <button
                        type="button"
                        onClick={() => handleDelete(review.id)}
                        disabled={deletingId === review.id}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-xs font-bold px-2 py-1 rounded-lg shadow transition-colors flex items-center gap-1"
                        title="Eliminar mi reseña"
                      >
                        {deletingId === review.id ? (
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          '✕'
                        )}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* No tiene sentido dejarte una reseña a ti mismo */}
        {!isOwner && <AddReview onAddReview={onAddReview} />}
      </div>
    </section>
  )
}

export default ReviewProfile