import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((star, index) => (
        <span
          key={index}
          style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
