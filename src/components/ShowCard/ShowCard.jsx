import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useFavorite } from '../../hooks/UseFavorite';

import { getUrlImages } from '../../utils';

import VoteBox from '../VoteBox/VoteBox';

import './ShowCard.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function ShowCard(props) {
  const { id, name, vote_average, poster_path, showId } = props.show;

  const { user, favorites } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const { addFavorite, removeFavorite } = useFavorite();

  // if the props are sended by the api the show has is own id
  // if the props are sended by the favorite page the id is in showId
  // @TODO maybe unify this to have only one var
  const favoriteId = id || showId;

  let favorite = favorites?.find((favorite) => {
    return favorite.showId === favoriteId.toString();
  });

  const handleFavorite = (e) => {
    e.preventDefault();
    addFavorite({ showData: props.show, favoriteId, setLoadingFavorite: setLoading });
  };

  const handleUnfavorite = (e) => {
    e.preventDefault();

    removeFavorite({ favoriteId, setLoadingFavorite: setLoading });
  };

  return (
    <article className='show__card'>
      <div className='show__card-image'>
        <button
          type='button'
          className='show__card-add'
          onClick={(e) =>
            favorite ? handleUnfavorite(e) : handleFavorite(e)
          }
          aria-busy={loading}
        >
          {user && (
            <>
              {!loading && (
                <FontAwesomeIcon
                  icon={faHeart}
                  className={favorite ? 'selected' : ''}
                  aria-hidden='true'
                />
              )}
              {loading && (
                <FontAwesomeIcon
                  icon={faCircleNotch}
                  className={'fa-spin'}
                  aria-hidden='true'
                />

            
          )}
          <span className='sr-only'>
              {favorite
                ? `Remove ${name} from favorites`
                : `Add ${name} to favorites`}
          </span>
          </>
          )}
        </button>
        <Link
          to={`/show/${showId || id}`}
          aria-label={`View details for ${name}`}
        >
          <img
            alt={`Poster for ${name}${vote_average ? `, rated ${vote_average} out of 10` : ''}`}
            src={getUrlImages('thumb', poster_path)}
          />
          {vote_average && <VoteBox vote={vote_average} />}
        </Link>
      </div>
      <p className='show__card-name'>{name}</p>
    </article>
  );
}
