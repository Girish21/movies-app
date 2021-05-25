import { MovieType } from "../types";
import getImagePath from "../utils/getImagePath";
import styles from "./index.module.css";

export default function MovieCard({ movie }: { movie: MovieType }) {
  const { title, poster_path, overview } = movie;

  return (
    <article className="move-card">
      <h3>{title}</h3>
      <img src={getImagePath(poster_path)} />
      <p>{overview}</p>
    </article>
  );
}
MovieCard.styles = styles;
