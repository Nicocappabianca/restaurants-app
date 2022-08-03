import { FC, useEffect, useState } from "react";
import styles from "./Home.module.scss";

let searchTimeout: NodeJS.Timeout;

interface HomeProps {
  mapsService: google.maps.places.PlacesService;
}

const Home: FC<HomeProps> = ({ mapsService }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      mapsService?.findPlaceFromQuery(
        { query: inputValue, fields: ["ALL"] },
        (data) => console.log(data?.[0].geometry?.location?.lat())
      );
    }, 700);
  }, [inputValue, mapsService]);

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
