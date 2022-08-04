import { FC, useEffect, useState, useRef, SetStateAction } from "react";
import { PlacesList } from "../../components";
import styles from "./SearchBar.module.scss";
import useOutsideClick from "../../hooks/useOutsideClick";

let searchTimeout: NodeJS.Timeout;

interface SearchBarProps {
  mapsService: google.maps.places.PlacesService;
  setLocation: React.Dispatch<
    SetStateAction<
      | {
          latitude: number;
          longitude: number;
        }
      | undefined
    >
  >;
}

const SearchBar: FC<SearchBarProps> = ({ mapsService, setLocation }) => {
  const [inputValue, setInputValue] = useState("");
  const [places, setPlaces] = useState<google.maps.places.PlaceResult[] | null>(
    null
  );
  const [showPlacesList, setShowPlacesList] = useState(false);
  const searchBarRef = useRef(null);

  useOutsideClick(searchBarRef, () => setShowPlacesList(false));

  useEffect(() => {
    setShowPlacesList(false);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      mapsService?.findPlaceFromQuery(
        { query: inputValue, fields: ["ALL"] },
        (data) => {
          if (data) {
            setPlaces(data);
            setShowPlacesList(true);
          }
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
        onFocus={() => setShowPlacesList(true)}
        placeholder="Find restaurants in..."
      />
      {places?.length && showPlacesList && (
        <div className={styles["places-list"]}>
          <PlacesList
            places={places}
            setLocation={setLocation}
            close={() => setShowPlacesList(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
