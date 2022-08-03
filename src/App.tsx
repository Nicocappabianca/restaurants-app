import { useState, useEffect, useRef } from "react";
import { Home } from "./pages";
import styles from "./App.module.scss";
import { useJsApiLoader } from "@react-google-maps/api";

const App = () => {
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
    <div className={styles.App}>
      {service && <Home mapsService={service} />}
      <div className={styles["fake-map"]} ref={fakeMapRef}></div>
    </div>
  );
};

export default App;
