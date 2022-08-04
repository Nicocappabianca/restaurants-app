import { FC, useState, useEffect, useRef } from "react";
import styles from "./Restaurant.module.scss";
import { useParams } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";

const Restaurant: FC = () => {
  const params = useParams();

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
      <h1>{params.restaurantId}</h1>
    </section>
  );
};

export default Restaurant;
