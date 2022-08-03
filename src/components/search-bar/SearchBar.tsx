import { FC, useEffect, useState } from "react";
import styles from "./SearchBar.module.scss";

let searchTimeout: NodeJS.Timeout;

interface SearchBarProps {
  mapsService: google.maps.places.PlacesService;
}

const SearchBar: FC<SearchBarProps> = ({ mapsService }) => {
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
    <div className={styles.SearchBar}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Find restaurants in..."
      />
    </div>
  );
};

export default SearchBar;
