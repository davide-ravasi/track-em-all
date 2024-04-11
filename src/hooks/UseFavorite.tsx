import { useDispatch } from "react-redux";
import { favoriteAdd, favoriteRemove } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";
import { User } from "../typescript/types";

export function useFavorite() {
  const dispatch: AppDispatch = useDispatch();

  interface IAddFavoriteProps {
    showData: any;
    user: User;
    id: string;
    setLoadingFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const addFavorite = ({
    showData,
    user,
    id,
    setLoadingFavorite,
  }: IAddFavoriteProps) => {
    setLoadingFavorite(true);

    dispatch(
      favoriteAdd({
        name: showData?.name,
        vote_average: showData?.vote_average,
        poster_path: showData?.poster_path,
        userId: user.id,
        showId: id,
      })
    )
      .then(() => {
        setLoadingFavorite(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  interface IRemoveFavoriteProps {
    user: User;
    favoriteId: string;
    setLoadingFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const removeFavorite = ({
    user,
    favoriteId,
    setLoadingFavorite,
  }: IRemoveFavoriteProps) => {
    setLoadingFavorite(true);

    dispatch(
      favoriteRemove({
        userId: user.id as number,
        showId: favoriteId,
      })
    )
      .then(() => {
        setLoadingFavorite(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { addFavorite, removeFavorite };
}
