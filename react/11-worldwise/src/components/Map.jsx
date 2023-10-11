import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  //reading data from query param in route.
  const [searchParams, setSearchParams] = useSearchParams(); //returns an array like useState : we can and set also.
  const lat = searchParams.get("lat"); //searchParams consistes of an object which we need to read using get function.
  const lng = searchParams.get("lng");
  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h1>
        Position : {lat} , {lng}
      </h1>

      {/* Setting the queryParam */}
      <button onClick={() => setSearchParams({ lat: 50, lng: 23 })}>
        Change Position
      </button>
    </div>
  );
}

export default Map;
