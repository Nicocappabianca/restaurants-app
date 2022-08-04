import { FC, useState, useEffect, useRef } from "react";
import styles from "./Restaurant.module.scss";
import { RestaurantDetails } from "../../components";
import { useParams } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";

const Restaurant: FC = () => {
  const { restaurantId } = useParams();

  const [service, setService] = useState<google.maps.places.PlacesService>();
  const fakeMapRef = useRef<HTMLDivElement>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && fakeMapRef.current)
      setService(new google.maps.places.PlacesService(fakeMapRef.current));
  }, [isLoaded]);

  return (
    <section className={styles.Restaurant}>
      {restaurantId && service && (
        <RestaurantDetails mapsService={service} restaurantId={restaurantId} />
      )}
      <div className={styles["fake-map"]} ref={fakeMapRef}></div>
    </section>
  );
};

export default Restaurant;
