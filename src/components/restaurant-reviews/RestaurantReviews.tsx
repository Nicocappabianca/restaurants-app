import { FC } from "react";
import styles from "./RestaurantReviews.module.scss";

interface RestaurantReviewsProps {
  reviews: google.maps.places.PlaceReview[];
}

const RestaurantReviews: FC<RestaurantReviewsProps> = ({ reviews }) => {
  return (
    <ul className={styles.RestaurantReviews}>
      {reviews.map((review, index) => (
        <li key={index}>
          <img src="/images/profile-placeholder.jpg" alt={review.author_name} />
          <div className={styles.text}>
            <h4>{review.author_name}</h4>
            <div className={styles.rating}>
              {Array(review.rating)
                .fill("")
                .map((star, index) => (
                  <img src="/images/star.svg" alt="star" key={index} />
                ))}
            </div>
            <p>{review.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RestaurantReviews;
