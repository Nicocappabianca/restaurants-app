import { FC, useEffect, useState, useRef } from "react";
import PlacesList from "../places-list/PlacesList";
import styles from "./SearchBar.module.scss";
import useOutsideClick from "../../hooks/useOutsideClick";

let searchTimeout: NodeJS.Timeout;

interface SearchBarProps {
  mapsService: google.maps.places.PlacesService;
}

const SearchBar: FC<SearchBarProps> = ({ mapsService }) => {
  const [inputValue, setInputValue] = useState("");
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[] | null>(
    null
  );
  const searchBarRef = useRef(null);

  useOutsideClick(searchBarRef, () => setPlaces(null));

  useEffect(() => {
    setPlaces(null);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      mapsService?.findPlaceFromQuery(
        { query: inputValue, fields: ["ALL"] },
        (data) => {
          if (data) setPlaces(data);
        }
      );
    }, 700);
  }, [inputValue, mapsService]);

  return (
    <div className={styles.SearchBar} ref={searchBarRef}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Find restaurants in..."
      />
      {places && (
        <div className={styles["places-list"]}>
          <PlacesList places={places} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
