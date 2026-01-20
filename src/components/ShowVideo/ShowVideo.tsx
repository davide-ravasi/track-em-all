import React, { useState, useEffect } from "react";

import { ShowVideoProps } from "../../typescript/types";

import useApiCall from "../../hooks/UseApiCall";
import LoadingStateHOC from "../../hoc/LoadingStateHOC";
import { getTrailerUrl } from "../../utils";

import "./ShowVideo.scss";

interface IShowVideoProps {
  idShow: string;
  showName: string;
  setLoading: (isComponentLoading: boolean) => void;
};

export const ShowVideo = (props: IShowVideoProps) => {
  const { idShow, showName, setLoading } = props;
  const [trailerUrl, setTrailerUrl] = useState<string | undefined>("");

  const url = `${
    import.meta.env.VITE_BASE_TVSHOW_URL
  }${idShow}/videos?api_key=${import.meta.env.VITE_API_KEY}`;
  const { response, error, loading } = useApiCall(url);

  useEffect(() => {
    if (response) {
      const url = getTrailerUrl(response);

      setTrailerUrl(url);
      setLoading(loading);
    } else {
      setLoading(false);
    }
  }, [response, error, loading, setLoading]);

  return (
    <>
      {trailerUrl && (
        <div className="video">
          <h2>Trailer</h2>
          <iframe
            width="560"
            height="315"
            title={`Trailer for ${showName}`}
            className="video__iframe"
            src={trailerUrl}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default LoadingStateHOC(ShowVideo);
