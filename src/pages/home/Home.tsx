import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import { useJsApiLoader } from "@react-google-maps/api";

let searchTimeout: NodeJS.Timeout;

const Home = () => {
  const [service, setService] = useState<google.maps.places.PlacesService>();
  const [inputValue, setInputValue] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded)
      setService(
        new google.maps.places.PlacesService(document.createElement("div"))
      );
  }, [isLoaded]);

  useEffect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      service?.findPlaceFromQuery(
        { query: inputValue, fields: ["ALL"] },
        (data) => console.log(data?.[0].geometry?.location?.lat())
      );
    }, 700);
  }, [inputValue, service]);

  return (
    <div className={styles.Home}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default Home;
