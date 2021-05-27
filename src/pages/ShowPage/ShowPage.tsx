import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useApiCall from "../../hooks/UseApiCall";

import { Show } from "../../typescript/types";

import "./ShowPage.scss";

type ShowPageType = {
  id: string;
};

export default function ShowPage(props: ShowPageType) {
  const { id } = useParams<ShowPageType>();
  const url = `${process.env.REACT_APP_BASE_TVSHOW_URL}${id}?api_key=${process.env.REACT_APP_API_KEY}`;

  const [showData, setShowData] = useState<Show | null>();
  const { response, error, loading } = useApiCall(url);

  useEffect(() => {
    setShowData(response);
  }, [response, error, loading]);
  return (
    <div className="page">
      <div className="page__content-wrapper">
        {error && <div className="loading-error">{error}</div>}
        {loading && <div className="loader">loading.....</div>}
        {showData && (
          <div className="show">
            <div className="show__media-wrapper">
              <img
                alt={showData.name}
                src={`${process.env.REACT_APP_BASE_IMG_URL}/${process.env.REACT_APP_BASE_BIG_IMG_WIDTH}${showData.backdrop_path}`}
              />
            </div>
            <div className="">{showData.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// https://api.themoviedb.org/3/tv/87917?api_key=b61f13ab08388482df500390ef8de990&language=en-US
// id: 87917

// creare url per immagine
// esportare type interno
// creare hook per call api
// creare box episodi e seconda call
// vedere per video youtube
