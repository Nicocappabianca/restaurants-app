import { FC } from "react";
import styles from "./Home.module.scss";
import { SearchBar } from "../../components";

interface HomeProps {
  mapsService: google.maps.places.PlacesService;
}

const Home: FC<HomeProps> = ({ mapsService }) => {
  return (
    <section className={styles.Home}>
      <SearchBar mapsService={mapsService} />
    </section>
  );
};

export default Home;
