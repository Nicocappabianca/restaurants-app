import { FC, SetStateAction } from "react";
import styles from "./CurrentLocationButton.module.scss";

interface CurrentLocationButtonProps {
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

const CurrentLocationButton: FC<CurrentLocationButtonProps> = ({
  setLocation,
}) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  const error = (err: { code: number }) => {
    alert(`Unable to get your current location (ERROR: ${err.code})`);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  return (
    <button
      className={styles.CurrentLocationButton}
      onClick={() => getCurrentLocation()}
    >
      <img src="/images/location.svg" alt="Location icon" />
      Click to use your current location
    </button>
  );
};

export default CurrentLocationButton;
