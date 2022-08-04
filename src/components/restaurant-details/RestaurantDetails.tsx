import { FC } from "react";
import styles from "./RestaurantDetails.module.scss";

interface RestaurantDetailsProps {
  mapsService: google.maps.places.PlacesService;
  restaurantId: string;
}

const RestaurantDetails: FC<RestaurantDetailsProps> = ({
  mapsService,
  restaurantId,
}) => {
  return <div className={styles.RestaurantDetails}></div>;
};

export default RestaurantDetails;
