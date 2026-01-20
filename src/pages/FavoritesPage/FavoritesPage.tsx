import { useSelector } from "react-redux";

import { RootState } from "../../typescript/types";

import ShowFavoriteList from "../../components/ShowFavoriteList/ShowFavoriteList";

import "./FavoritesPage.scss";

export default function FavoritesPage() {
  const { favorites } = useSelector((state: RootState) => state.auth.user);

  return (
    <main className="page">
      <div className="page__content-wrapper">
        <section>
          <h1>Your Favorite Shows</h1>
          {favorites && favorites.length > 0 ? (
            <ShowFavoriteList favorites={favorites} />
          ) : (
            <p>You haven't added any favorite shows yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
