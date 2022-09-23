import { SelectionSetNode } from "graphql";

export enum Sections {
  Tv = "tv",
  Movies = "movies",
  Person = "person"
}

export enum Categories {
  Popular = "popular",
  TopRated = "top_rated",
  Recommended = "recommendations",
  Upcoming = "upcoming",
  NowPlaying = "now_playing",
  Search = "search",
}

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
  title?: string;
  section: Sections;
  category: Categories;
  urlParameter?: number;
  cardAmount?: number;
};

type SearchProps = {
  shows: Show[];
};

type EpisodeProps = {
  season_number: number;
  episode_number: number;
  overview: string;
  air_date: string;
  still_path: string;
  name: string;
  showId: string;
};

type GlobalContext = {
  searchTerm: string;
  searchResults: Show[];
  getSearchData: (e: React.FormEvent<HTMLFormElement>) => void;
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
  season_number: number;
  overview: string;
};

type Actor = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

type CastData = {
  cast: Actor[];
  crew: Actor[];
  guest_stars: Actor[];
  id: number;
};

type Image = {
  aspect_radio: number;
  file_path: string;
  height: number;
  width: number;
};

type ImagesData = {
  id: number;
  stills: Image[];
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

type ShowResponse = {
  page: number;
  results: Show[];
};

export type {
  Show,
  ShowListProps,
  SearchProps,
  ShowPageType,
  GlobalContext,
  ShowSeasonProps,
  Season,
  Episode,
  EpisodeProps,
  ShowVideoProps,
  VideoApiResponse,
  Video,
  Actor,
  CastData,
  ImagesData,
  ShowResponse,
};
