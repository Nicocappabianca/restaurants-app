import { FC } from "react";
import styles from "./RestaurantsList.module.scss";

interface RestaurantsListProps {
  restaurants: google.maps.places.PlaceResult[];
}

const RestaurantsList: FC<RestaurantsListProps> = ({ restaurants }) => {
  console.log(restaurants);
  return <ul className={styles.RestaurantsList}></ul>;
};

export default RestaurantsList;
