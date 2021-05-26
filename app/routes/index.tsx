import type { MetaFunction, LinksFunction, LoaderFunction } from "remix";
import { block, useRouteData } from "remix";
import MovieCard from "../components/movieCard";

import stylesUrl from "../styles/index.css";
import listStylesUrl from "../styles/list.css";
import { DiscoverResponse } from "../types";
import getImagePath from "../utils/getImagePath";

export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
};

export let links: LinksFunction = ({ data }) => {
  const preloadData = (data as unknown as DiscoverResponse).results.slice(0, 5);
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: listStylesUrl },
    { rel: "stylesheet", href: MovieCard.styles },
    ...preloadData.map((movie) =>
      block({
        rel: "preload",
        as: "image",
        href: getImagePath(movie.poster_path),
      })
    ),
  ];
};

export let loader: LoaderFunction = async () => {
  const API_KEY = process.env.API || "";
  const BASE_URL_V3 = process.env.BASE_URL_V3 || "";
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: "en-US",
    sort_by: "popularity.desc",
    page: "1",
    with_watch_monetization_types: "flatr",
  }).toString();

  return fetch(`${BASE_URL_V3}/discover/movie?${searchParams}`, {
    method: "GET",
  });
};

export default function Index() {
  let data = useRouteData<DiscoverResponse>();

  return (
    <main>
      <header />
      <section>
        <div className="list-container">
          {data.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </main>
  );
}
