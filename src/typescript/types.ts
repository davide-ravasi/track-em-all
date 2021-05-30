type Show = {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
};

type ShowListProps = {
  title: string;
  shows: Show[];
};

type SearchProps = {
  shows: Show[];
};



type GlobalContext = {
  searchTerm: string;
  searchResults: Show[];
  getSearchData: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type { Show, ShowListProps, GlobalContext, SearchProps };
