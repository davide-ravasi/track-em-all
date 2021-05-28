import React, { useState, useEffect } from "react";

import useApiCall from "../../hooks/UseApiCall";

import Loader from "../Loader/Loader";

type ShowVideoProps = {
  idShow: string;
};

export default function ShowVideo(props: ShowVideoProps) {
  const { idShow } = props;
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>("");

  const url = `${process.env.REACT_APP_BASE_TVSHOW_URL}${idShow}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
  const { response, error, loading } = useApiCall(url);

  const getTrailerUrl = (response: any) => {
    if (response) {
      const { results } = response;
      const { key } = results.find((video: any) => video.type === "Trailer");
      return `//www.youtube.com/embed/${key}?rel=0`;
    }
  };

  useEffect(() => {
    if (response) {
      const url = getTrailerUrl(response);
      setTrailerUrl(url);
    }
  }, [response, error, loading]);

  return (
    <div>
      <h2>Trailer</h2>
      {error && <div className="loading-error">{error}</div>}
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      {trailerUrl && (
        <iframe
          width="560"
          height="315"
          title="trailer"
          src={trailerUrl}
        ></iframe>
      )}
    </div>
  );
}

// env var per url videos
// external function in utils
