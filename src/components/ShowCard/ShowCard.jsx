import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faHeart } from "@fortawesome/free-solid-svg-icons";
import { favoriteAdd, favoriteRemove } from "../../features/auth/authSlice";

import { getUrlImages } from "../../utils";

import VoteBox from "../VoteBox/VoteBox";

import "./ShowCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function ShowCard(props) {
  const { id, name, vote_average, poster_path, showId } = props.show;

  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // if the props are sended by the api the show has is own id
  // if the props are sended by the favorite page the id is in showId
  // @TODO maybe unify this to have only one var
  const favoriteId = id || showId;

  let favorite = null;

  if (user && user.favorites) {
    favorite = user.favorites.find((favorite) => {
      return favorite.showId === favoriteId.toString();
    });
  }

  const handleFavorite = (e) => {
    e.preventDefault();

    setLoading(true);

    dispatch(
      favoriteAdd({
        name,
        vote_average,
        poster_path,
        userId: user.id,
        showId: id,
      })
    ).then(() => {
      setLoading(false);
    })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUnfavorite = (e, favoriteId) => {
    e.preventDefault();

    setLoading(true);

    dispatch(
      favoriteRemove({
        userId: user.id,
        showId: favoriteId,
      })
    ).then(() => {
      setLoading(false);
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <article className="show__card">
      <div className="show__card-image">
        <button
          type="button"
          className="show__card-add"
          onClick={(e) =>
            favorite ? handleUnfavorite(e, favoriteId) : handleFavorite(e)
          }
        >
          {user && (
            <>
              {!loading && (
                <FontAwesomeIcon
                  icon={faHeart}
                  className={favorite ? "selected" : ""}
                />
              )}
              {loading && (
                <FontAwesomeIcon icon={faCircleNotch} className={"fa-spin"} />
              )}
            </>
          )}
        </button>
        <Link to={`/show/${showId || id}`}>
          <img alt={name} src={getUrlImages("thumb", poster_path)} />
          {vote_average && <VoteBox vote={vote_average} />}
        </Link>
      </div>
      <p className="show__card-name">{name}</p>
    </article>
  );
}
