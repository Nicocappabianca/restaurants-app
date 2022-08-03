import { FC, useRef } from "react";
import styles from "./PlacesList.module.scss";

interface PlacesListProps {
  places: google.maps.places.PlaceResult[];
}

const PlacesList: FC<PlacesListProps> = ({ places }) => {
  const listRef = useRef(null);
  return (
    <ul className={styles.PlacesList} ref={listRef}>
      {places?.map((place, index) => (
        <li className={styles.place} key={index}>
          <p>{place.formatted_address}</p>
        </li>
      ))}
    </ul>
  );
};

export default PlacesList;
