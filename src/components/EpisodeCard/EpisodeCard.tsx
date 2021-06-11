import React from "react";
import { Link } from "react-router-dom";

import VoteBox from "../VoteBox/VoteBox";

import { Episode } from "../../typescript/types";
import { getUrlImages } from "../../utils";

import "./EpisodeCard.scss";

type EpisodeCardProps = {
  episode: Episode;
  showId: string;
};

export default function EpisodeCard(props: EpisodeCardProps) {
  const {
    id,
    name,
    vote_average,
    still_path,
    episode_number,
    air_date,
    season_number,
    overview,
  } = props.episode;

  return (
    <Link
      className="list__box"
      to={{
        pathname: `/episode/${id}`,
        state: {
          season_number,
          episode_number,
          overview,
          air_date,
          still_path,
          name,
          showId: props.showId,
        },
      }}
    >
      <div className="list__box-image">
        <img alt={name} src={getUrlImages("thumb", still_path, "landscape")} />
      </div>
      <p className="list__box-name">{name}</p>
      <VoteBox vote={vote_average} />
      <p className="list__box-detail">Episode {episode_number}</p>
      <p className="list__box-detail">Air date: {air_date}</p>
    </Link>
  );
}
