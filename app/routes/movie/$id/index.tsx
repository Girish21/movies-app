import { block, LinksFunction, LoaderFunction, MetaFunction } from "remix";
import { redirect, useRouteData } from "remix";
import { MovieDetailResponse } from "../../../types";
import getImagePath from "../../../utils/getImagePath";
import stylesUrl from "../../../styles/$id-index.css";
import SpaceBetween from "../../../components/spaceBetween";
import Pill from "../../../components/pill";

export const meta: MetaFunction = ({ data }) => {
  const { movie } = data as unknown as MovieDetailResponse;
  return {
    title: movie.title,
    description: movie.overview,
  };
};

export const links: LinksFunction = ({ data }) => {
  const { movie } = data as unknown as MovieDetailResponse;

  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: Pill.styles },
    block({
      rel: "preload",
      as: "image",
      href: getImagePath(movie.backdrop_path),
    }),
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { id: movieId } = params;

  if (!movieId) return redirect("/");

  const API_KEY = process.env.API || "";
  const BASE_URL_V3 = process.env.BASE_URL_V3 || "";
  const queryString = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
  }).toString();

  try {
    const [movie, cast] = await Promise.all([
      fetch(`${BASE_URL_V3}/movie/${movieId}?${queryString}`).then((data) => {
        if (data.ok) return data.json();
        throw new Error("movie not found!");
      }),
      fetch(`${BASE_URL_V3}/movie/${movieId}/credits?${queryString}`).then(
        (data) => {
          if (data.ok) return data.json();
          throw new Error("cast fetch failed");
        }
      ),
    ]);
    return { movie, cast };
  } catch {
    return redirect("/");
  }
};

export default function MovieDetail() {
  const { cast, movie } = useRouteData<MovieDetailResponse>();
  console.log(movie);

  return (
    <main style={{ position: "relative" }}>
      <div>
        <img
          src={getImagePath(movie.backdrop_path)}
          alt={movie.title}
          className="fixed-background"
          aria-hidden="true"
        />
      </div>
      <div className="root-container">
        <section className="wrapper">
          <header>
            <img
              src={getImagePath(movie.poster_path)}
              alt={movie.title}
              className="banner-image"
            />
            <div className="detail-container">
              <h1>{movie.title}</h1>
              <div className="rating-container">
                <span className="rating-header">RATING</span>
                <SpaceBetween direction="vertical" size="0.5rem" />
                <span className="rating">{movie.vote_average} / 10</span>
              </div>
            </div>
          </header>
          <p className="overview-container">{movie.overview}</p>
          {movie.genres.map((genere) => (
            <Pill key={genere.id}>{genere.name}</Pill>
          ))}
        </section>
      </div>
    </main>
  );
}
