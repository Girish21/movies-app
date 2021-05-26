import { Link } from "react-router-dom";
import { MovieType } from "../../types";
import getImagePath from "../../utils/getImagePath";
import styles from "../../styles/movie-card.css";

export default function MovieCard({ movie }: { movie: MovieType }) {
  const { title, poster_path, overview, id } = movie;

  return (
    <Link to={`${id}`} className="wrapper">
      <div className="movie-card">
        <h3>{title}</h3>
        <img src={getImagePath(poster_path)} />
        <p>{overview}</p>
      </div>
    </Link>
  );
}
MovieCard.styles = styles;
