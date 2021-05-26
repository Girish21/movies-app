type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

type MovieDetailType = {
  genres: { id: string; name: string }[];
  homepage: string;
};

type DiscoverResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieType[];
};

type CastType = {
  id: string;
  name: string;
  character: string;
  profile_path: string;
};

type MovieDetailResponse = {
  movie: MovieType & MovieDetailType;
  cast: { cast: CastType[] };
};

export type {
  CastType,
  MovieType,
  MovieDetailType,
  DiscoverResponse,
  MovieDetailResponse,
};
