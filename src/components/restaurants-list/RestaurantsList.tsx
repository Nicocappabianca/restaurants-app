import { FC } from "react";
import styles from "./RestaurantsList.module.scss";
import { Link } from "react-router-dom";

interface RestaurantsListProps {
  restaurants: google.maps.places.PlaceResult[];
}

const restaurantStatus = {
  CLOSED_PERMANENTLY: "This restaurant is closed permanently.",
  CLOSED_TEMPORARILY: "This restaurant is closed temporarily.",
  OPERATIONAL: "This restaurant is open",
};

const RestaurantsList: FC<RestaurantsListProps> = ({ restaurants }) => {
  return (
    <ul className={styles.RestaurantsList}>
      {restaurants
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 10)
        .map((restaurant) => (
          <li key={restaurant.place_id}>
            <Link to={`/restaurant/${restaurant.place_id}`}>
              <h4>
                {Number(restaurant?.name?.length) > 40
                  ? `${restaurant.name?.substring(0, 35)}...`
                  : restaurant.name}
              </h4>
              {restaurant.business_status && (
                <p>{restaurantStatus[restaurant.business_status]}</p>
              )}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default RestaurantsList;
