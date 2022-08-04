import { FC, useState } from "react";
import { RestaurantReviews } from "../../components";
import styles from "./RestaurantDetails.module.scss";

interface RestaurantDetailsProps {
  mapsService: google.maps.places.PlacesService;
  restaurantId: string;
}

const RestaurantDetails: FC<RestaurantDetailsProps> = ({
  mapsService,
  restaurantId,
}) => {
  const [restaurant, setRestaurant] =
    useState<google.maps.places.PlaceResult>();

  mapsService.getDetails({ placeId: restaurantId }, (data) => {
    if (data) setRestaurant(data);
  });

  return (
    <div className={styles.RestaurantDetails}>
      {restaurant && (
        <>
          <div className={styles.intro}>
            <div className={styles.text}>
              <h1>{restaurant.name}</h1>
              <p>{restaurant.formatted_address}</p>
              <p>
                Type:&nbsp;
                {restaurant?.types?.join(" - ").replaceAll("_", " ")}
              </p>
            </div>
            <img
              src={
                restaurant?.photos?.[0].getUrl() ||
                "/images/restaurant-placeholder.png"
              }
              alt={restaurant.name}
            />
          </div>
        </>
      )}
      {restaurant?.reviews && (
        <RestaurantReviews reviews={restaurant.reviews} />
      )}
    </div>
  );
};

export default RestaurantDetails;
