type Show = {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
};

type ShowListProps = {
  title: string;
  shows: Show[];
};

type GlobalContext = {
  searchTerm: string;
  searchResults: Show[];
};

export type { Show, ShowListProps, GlobalContext };
