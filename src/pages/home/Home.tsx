import { FC, useState, useEffect } from "react";
import styles from "./Home.module.scss";
import { SearchBar, CurrentLocationButton } from "../../components";

interface HomeProps {
  mapsService: google.maps.places.PlacesService;
}

const Home: FC<HomeProps> = ({ mapsService }) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [restaurants, setRestaurants] =
    useState<google.maps.places.PlaceResult[]>();

  useEffect(() => {
    if (location) {
      const selectedLocation = new google.maps.LatLng(
        location.latitude,
        location.longitude
      );

      const request = {
        location: selectedLocation,
        radius: 500,
        type: "restaurant",
      };

      mapsService.nearbySearch(request, (data) => {
        if (data) setRestaurants(data);
      });
    }
  }, [location, mapsService]);

  return (
    <section className={styles.Home}>
      <CurrentLocationButton setLocation={setLocation} />
      <SearchBar mapsService={mapsService} />
    </section>
  );
};

export default Home;
