import { FC, useRef, SetStateAction } from "react";
import styles from "./PlacesList.module.scss";

interface PlacesListProps {
  places: google.maps.places.PlaceResult[];
  setLocation: React.Dispatch<
    SetStateAction<
      | {
          latitude: number;
          longitude: number;
        }
      | undefined
    >
  >;
  close: () => void;
}

const PlacesList: FC<PlacesListProps> = ({ places, setLocation, close }) => {
  const listRef = useRef(null);

  const setCurrentLocation = (place: google.maps.places.PlaceResult) => {
    const location = {
      latitude: place?.geometry?.location?.lat() as number,
      longitude: place?.geometry?.location?.lng() as number,
    };

    setLocation(location);
    close();
  };

  return (
    <ul className={styles.PlacesList} ref={listRef}>
      {places?.map((place, index) => (
        <li
          className={styles.place}
          key={index}
          onClick={() => setCurrentLocation(place)}
        >
          <p>{place.formatted_address}</p>
        </li>
      ))}
    </ul>
  );
};

export default PlacesList;
