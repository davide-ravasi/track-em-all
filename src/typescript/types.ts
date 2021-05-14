type Show = {
  name: string;
  poster_path: string;
  vote_average: number;
};

type ShowListProps = {
  title: string;
  shows: Show[];
};

export type {
    Show,
    ShowListProps
};
