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

export type { Show, ShowListProps, ShowPageType, GlobalContext };
