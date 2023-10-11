import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import flagemojiToPNG from "./FlagToPng";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      {/* Setting state variable data in the route , route should not be with / i.e. `/${id}`, that will add to route id */}
      {/* along with that, setting state variable data through query param */}
      <Link
        className={styles.cityItem}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* <span className={styles.emoji}>{emoji}</span> */}
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
