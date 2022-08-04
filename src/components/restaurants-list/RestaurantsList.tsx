import { FC } from "react";
import styles from "./RestaurantsList.module.scss";

interface RestaurantsListProps {
  restaurants: google.maps.places.PlaceResult[];
}

const RestaurantsList: FC<RestaurantsListProps> = ({ restaurants }) => {
  console.log(restaurants);
  return (
    <ul className={styles.RestaurantsList}>
      {restaurants
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .map((restaurant) => (
          <li key={restaurant.place_id}>
            <h4>{restaurant.name}</h4>
            <p>{restaurant.rating}</p>
          </li>
        ))}
    </ul>
  );
};

export default RestaurantsList;
