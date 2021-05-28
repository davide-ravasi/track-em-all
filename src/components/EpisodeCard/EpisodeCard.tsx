import React from "react";

import VoteBox from "../VoteBox/VoteBox";

import { Episode } from "../../typescript/types";
import "./EpisodeCard.scss";

type EpisodeCardProps = {
  episode: Episode;
};

export default function EpisodeCard(props: EpisodeCardProps) {
  const { name, vote_average, still_path, episode_number, air_date } =
    props.episode;
  const baseThumbUrl = process.env.REACT_APP_BASE_IMG_URL;
  const baseThumbW = process.env.REACT_APP_BASE_THUMB_WIDTH;

  return (
    <a className="list__box" href="http://google.com">
      <div className="list__box-image">
        <img alt={name} src={`${baseThumbUrl}/${baseThumbW}/${still_path}`} />
      </div>
      <p className="list__box-name">{name}</p>
      <VoteBox vote={vote_average} />
      <p className="list__box-detail">Episode {episode_number}</p>
      <p className="list__box-detail">Air date: {air_date}</p>
    </a>
  );
}
