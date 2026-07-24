import { useDispatch, useSelector } from 'react-redux';
import { favoriteAdd, favoriteRemove } from '../features/auth/authSlice';
import { AppDispatch } from '../app/store';
import {
  nameValidation,
  posterPathValidation,
  showIdValidation,
  voteAverageValidation,
  FAVORITE_VALIDATION_MESSAGES,
  maxFavoritesValidation,
} from '../utils/favoriteValidation';
import { RootState } from '../typescript/types';
import { toast } from 'react-toastify';

type ShowData = {
  name: string;
  vote_average?: number;
  poster_path?: string | null;
};

export function useFavorite() {
  const dispatch: AppDispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.auth);

  interface IAddFavoriteProps {
    showData: ShowData;
    favoriteId: string;
    setLoadingFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const addFavorite = ({
    showData,
    favoriteId,
    setLoadingFavorite,
  }: IAddFavoriteProps) => {
    setLoadingFavorite(true);

    if (!showIdValidation(favoriteId)) {
      console.error(FAVORITE_VALIDATION_MESSAGES.favoriteShowIdInvalid);
      setLoadingFavorite(false);
      return;
    }

    if (!nameValidation(showData?.name)) {
      console.error(FAVORITE_VALIDATION_MESSAGES.favoriteNameInvalid);
      setLoadingFavorite(false);
      return;
    }

    if (
      showData?.vote_average &&
      !voteAverageValidation(showData?.vote_average)
    ) {
      console.error(FAVORITE_VALIDATION_MESSAGES.favoriteVoteAverageInvalid);
      setLoadingFavorite(false);
      return;
    }

    if (showData?.poster_path && !posterPathValidation(showData?.poster_path)) {
      console.error(FAVORITE_VALIDATION_MESSAGES.favoritePosterPathInvalid);
      setLoadingFavorite(false);
      return;
    }

    if (!maxFavoritesValidation(favorites)) {
      toast.error(FAVORITE_VALIDATION_MESSAGES.maxFavoritesReached);
      setLoadingFavorite(false);
      return;
    }

    // RTK: dispatch(thunk) resolves for both success and failure unless you
    // .unwrap() — then fulfilled resolves with the payload, rejected rejects
    // into .catch() (needed for toast on API errors from rejectWithValue).
    dispatch(
      favoriteAdd({
        name: showData?.name,
        vote_average: showData?.vote_average ?? 0,
        poster_path: showData?.poster_path ?? '',
        showId: favoriteId,
      })
    )
      .unwrap()
      .then(() => {
        setLoadingFavorite(false);
      })
      .catch((error) => {
        // rejectWithValue usually passes a string message, not an Error object
        toast.error(
          typeof error === 'string'
            ? error
            : error?.message ?? 'Favorite request failed'
        );
        setLoadingFavorite(false);
      });
  };

  interface IRemoveFavoriteProps {
    favoriteId: string;
    setLoadingFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const removeFavorite = ({
    favoriteId,
    setLoadingFavorite,
  }: IRemoveFavoriteProps) => {
    setLoadingFavorite(true);

    if (!showIdValidation(favoriteId)) {
      console.error(FAVORITE_VALIDATION_MESSAGES.favoriteShowIdInvalid);
      setLoadingFavorite(false);
      return;
    }

    // See addFavorite: .unwrap() so rejected thunks hit .catch() for user toast.
    dispatch(
      favoriteRemove({
        showId: favoriteId,
      })
    )
      .unwrap()
      .then(() => {
        setLoadingFavorite(false);
      })
      .catch((error) => {
        toast.error(
          typeof error === 'string'
            ? error
            : error?.message ?? 'Favorite request failed'
        );
        setLoadingFavorite(false);
      });
  };

  return { addFavorite, removeFavorite };
}
