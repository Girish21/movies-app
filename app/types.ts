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

type DiscoverResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieType[];
};

export type { MovieType, DiscoverResponse };
