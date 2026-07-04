import type { PortfolioItem } from '../../types/user';
interface ReviewProps {
    review: PortfolioItem;
}

function PortfolioItemCard({ review }: ReviewProps) {

    const stars = '⭐'.repeat(review.rating);

    return (

    <>  
        <div className="relative rounded-2xl overflow-hidden shadow-md bg-[#1d61a1] group aspect-4/3">
            <img src={""} alt="Breter" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />/*modificar el back para que envie la info bien*/
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-[#1d61a1] via-[#1d61a1]/90 to-transparent pt-12 pb-4 px-4 text-white">
                <p className="text-xs text-gray-300 font-medium mb-1">{review.created_at}</p>
                <p className="text-lg font-bold tracking-wide mb-1">{review.description}</p>
                <p className="text-sm text-amber-400 font-semibold flex items-center gap-0.5">
                    {stars}
                </p>
            </div>
        </div>
    
    </>)
}
export default PortfolioItemCard;