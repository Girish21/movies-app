import { MovieType } from "../../types";
import getImagePath from "../../utils/getImagePath";
import styles from "../../styles/movie-card.css";

export default function MovieCard({ movie }: { movie: MovieType }) {
  const { title, poster_path, overview, id } = movie;

  return (
    <a href={`movie/${id}`} className="wrapper">
      <div className="movie-card">
        <h3>{title}</h3>
        <img src={getImagePath(poster_path)} alt={title} />
        <p>{overview}</p>
      </div>
    </a>
  );
}
MovieCard.styles = styles;
