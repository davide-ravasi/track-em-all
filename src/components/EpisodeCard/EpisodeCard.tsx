import React from 'react';
import { Link } from 'react-router-dom';

import VoteBox from '../VoteBox/VoteBox';

import { Episode } from '../../typescript/types';
import { getUrlImages } from '../../utils';

import './EpisodeCard.scss';

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
    <article className='list__box'>
      <section className='list__box-image'>
        <Link
          title={`View details for ${name} Season ${season_number} Episode ${episode_number}`}
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
          <img
            alt={`${name} Season ${season_number} Episode ${episode_number} episode poster`}
            src={getUrlImages('thumb', still_path)}
            width='100%'
          />
        </Link>
      </section>
      <section className='list__box-content'>
        <h2 className='list__box-name'>{name}</h2>
        <VoteBox vote={vote_average} />
        <p className='list__box-detail'>Episode {episode_number}</p>
        <p className='list__box-detail'>Air date: {air_date}</p>
      </section>
    </article>
  );
}
