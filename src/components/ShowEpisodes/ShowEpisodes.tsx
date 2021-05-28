import React, { useEffect, useState } from "react";

import useApiCall from "../../hooks/UseApiCall";
import { ShowSeasonProps, Season } from "../../typescript/types";

import Loader from "../../components/Loader/Loader";
import EpisodeCard from "../../components/EpisodeCard/EpisodeCard";

export default function ShowEpisodes(props: ShowSeasonProps) {
  const { season, idShow } = props;
  const url = `${process.env.REACT_APP_BASE_TVSHOW_URL}${idShow}/season/${season}?api_key=${process.env.REACT_APP_API_KEY}`;
  const { response, error, loading } = useApiCall(url);
  const [seasonData, setSeasonData] = useState<Season | null>();

  useEffect(() => {
    setSeasonData(response);
  }, [response, error, loading]);

  return (
    <div className="list">
      {error && <div className="loading-error">{error}</div>}
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      {seasonData &&
        seasonData.episodes.map((episode) => {
          return <EpisodeCard episode={episode} />;
        })}
    </div>
  );
}
