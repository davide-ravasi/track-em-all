import React, { useState, useEffect } from "react";

import { ShowVideoProps } from "../../typescript/types";

import useApiCall from "../../hooks/UseApiCall";
import LoadingStateHOC from "../../hoc/LoadingStateHOC";
import { getTrailerUrl } from "../../utils";

import "./ShowVideo.scss";

export const ShowVideo = (props: ShowVideoProps) => {
  const { idShow, setLoading } = props;
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>("");

  const url = `${process.env.REACT_APP_BASE_TVSHOW_URL}${idShow}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
  const { response, error, loading } = useApiCall(url);

  useEffect(() => {
    if (response) {
      const url = getTrailerUrl(response);
      setTrailerUrl(url);
      setLoading(loading);
    }
  }, [response, error, loading, setLoading]);

  return (
    <>
      {error && <div className="loading-error">{error}</div>}
      {trailerUrl && (
        <div className="video">
          <h2>Trailer</h2>(
          <iframe
            width="560"
            height="315"
            title="trailer"
            className="video__iframe"
            src={trailerUrl}
          ></iframe>
          )
        </div>
      )}
    </>
  );
};

export default LoadingStateHOC(ShowVideo);
