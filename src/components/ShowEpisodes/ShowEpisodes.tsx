import React from "react";

import useApiCall from "../../hooks/UseApiCall";

type ShowSeasonProps = {
  season: number;
  idShow: string;
};

export default function ShowSeason(props: ShowSeasonProps) {
  const { season, idShow } = props;
  const url = `${process.env.REACT_APP_BASE_TVSHOW_URL}${idShow}/season/${season}?api_key=${process.env.REACT_APP_API_KEY}`;
  const { response, error, loading } = useApiCall(url);

  return (
    <div>
      {season}
      {idShow}
    </div>
  );
}
