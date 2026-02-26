import React from "react";
import { getTrailerUrl } from "../../utils";

import "./ShowVideo.scss";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

interface IShowVideoProps {
  idShow: string;
  showName: string;
}

export const ShowVideo = (props: IShowVideoProps) => {
  const { idShow, showName } = props;

  const url = `${
    import.meta.env.VITE_BASE_TVSHOW_URL
  }${idShow}/videos?api_key=${import.meta.env.VITE_API_KEY}`;

  const { data, error, isLoading } = useQuery({
    queryKey: ["video", idShow],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch videos");
      return res.json();
    },
  });

  const trailerUrl = data ? getTrailerUrl(data) : undefined;

  return (
    <>
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
          aria-label="Loading video"
        >
          <Loader aria-hidden="true" aria-busy="true" />
        </div>
      )}
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

export default ShowVideo;
