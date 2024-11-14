import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

type RatingProps = {
    rating: number;
    maxRating: number;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-3">
      {/* Filled stars */}
      {[...Array(filledStars)].map((_, index) => (
        <FaStar key={`filled-${index}`} className="text-yellow-300 w-2 h-2  sm:w-5 sm:h-5" />
      ))}

      {/* Half star if applicable */}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-300 w-2 h-2 sm:w-5 sm:h-5" />}

      {/* Empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="text-gray-300 w-5 h-5" />
      ))}

      {/* Rating number */}
      {/* <span className="ml-2 text-sm text-gray-500">{rating.toFixed(1)}</span> */}
    </div>
  );
};

export default Rating
