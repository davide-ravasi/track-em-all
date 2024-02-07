import { useSelector } from "react-redux";

import { RootState } from "../../typescript/types";

import ShowFavoriteList from "../../components/ShowFavoriteList/ShowFavoriteList";

import "./FavoritesPage.scss";

export default function FavoritesPage() {
  const { favorites } = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="page">
      <div className="page__content-wrapper">
        <div className="favorite">
          <h1>Your Favorite Shows</h1>
          {favorites && <ShowFavoriteList favorites={favorites} />}
        </div>
      </div>
    </div>
  );
}
