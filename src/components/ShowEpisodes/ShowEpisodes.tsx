import { ShowSeasonProps, Season } from "../../typescript/types";

import Loader from "../../components/Loader/Loader";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";
import { useQuery } from "@tanstack/react-query";
import { Episode } from "../../typescript/types";

export const ShowEpisodes = (props: ShowSeasonProps) => {
  const { season, idShow } = props;
  const url = `${
    import.meta.env.VITE_BASE_TVSHOW_URL
  }${idShow}/season/${season}?api_key=${import.meta.env.VITE_API_KEY}`;

  const { data, error, isLoading } = useQuery({
    queryKey: ["episodes", idShow, season],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch episodes");
      return res.json();
    },
  });

  return (
    <div className="list">
      {error && (
        <div className="loading-error" role="alert">
          {error?.message}
        </div>
      )}
      {isLoading && (
        <div
          className="loader"
          aria-live="polite"
          aria-atomic="true"
          role="status"
          aria-label="Loading episodes"
        >
          <Loader aria-hidden="true" aria-busy="true" />
        </div>
      )}
      {data &&
        data.episodes &&
        data.episodes.length > 0 &&
        data.episodes.map((episode: Episode) => {
          return (
            <EpisodeCard key={episode.id} episode={episode} showId={idShow} />
          );
        })}
    </div>
  );
};

export default ShowEpisodes;
