import * as React from "react";
import { block, LinksFunction, LoaderFunction, MetaFunction } from "remix";
import { redirect, useRouteData } from "remix";
import { MovieDetailResponse } from "../../types";
import getImagePath from "../../utils/getImagePath";
import stylesUrl from "../../styles/$id-index.css";

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

  React.useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <main style={{ position: "relative" }}>
      <header>
        <img
          src={getImagePath(movie.backdrop_path)}
          className="fixed-background"
        />
      </header>
      <div className="root-container" />
    </main>
  );
}
