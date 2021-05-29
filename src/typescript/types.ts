type Show = {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  languages?: string[];
  created_by?: Creator[];
  genres?: Genre[];
  number_of_episodes?: number;
  number_of_seasons?: number;
};

type Genre = {
  id: number;
  name: string;
};

type Creator = {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  profile_path: string;
};

type ShowListProps = {
  title: string;
  shows: Show[];
};

type GlobalContext = {
  searchTerm: string;
  searchResults: Show[];
};

type ShowPageType = {
  id: string;
};

type ShowSeasonProps = {
  season: number;
  idShow: string;
  setLoading: (isComponentLoading: boolean) => void;
};

type Season = {
  name: String;
  episodes: Episode[];
};

type Episode = {
  id: number;
  episode_number: number;
  vote_average: number;
  name: string;
  still_path: string;
  air_date: number;
};

type VideoApiResponse = {
  id: number;
  results: Video[];
};

type Video = {
  id: number;
  name: string;
  key: number;
  type: string;
};

type ShowVideoProps = {
  idShow: string;
  setLoading: (isComponentLoading: boolean) => void;
};

export type {
  Show,
  ShowListProps,
  ShowPageType,
  GlobalContext,
  ShowSeasonProps,
  Season,
  Episode,
  ShowVideoProps,
  VideoApiResponse,
  Video,
};
