import { useDispatch, useSelector } from 'react-redux';
import {
  actualHost,
  favoriteAdd,
  favoriteRemove,
} from '../features/auth/authSlice';
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
import axios from 'axios';
import { favoriteRequestHeaders } from '../features/auth/authSlice';
import { useMutation } from '@tanstack/react-query';

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

  const addFavoriteDb = async ({ showData, favoriteId }: IAddFavoriteProps) => {
    try {
      const response = await axios.post(
        actualHost + '/favorite/add',
        { ...showData, showId: favoriteId },
        {
          headers: favoriteRequestHeaders(),
        }
      );
      // Plain JSON only — full AxiosResponse (headers, etc.) is not Redux-serializable
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data ?? error?.message);
    }
  };

  const addFavoriteMutation = useMutation({
    mutationFn: addFavoriteDb,
    onSuccess: (response, variables) => {
      // RTK: .fulfilled(payload, requestId, arg) — arg = stesso shape del thunk
      dispatch(
        favoriteAdd.fulfilled(response, crypto.randomUUID(), {
          name: variables.showData.name,
          vote_average: variables.showData.vote_average ?? 0,
          poster_path: variables.showData.poster_path ?? '',
          showId: variables.favoriteId,
        })
      );
      variables.setLoadingFavorite(false);
    },
    onError: (error, variables) => {
      toast.error(
        typeof error === 'string'
          ? error
          : (error?.message ?? 'Favorite request failed')
      );
      variables.setLoadingFavorite(false);
    },
  });

  const addFavorite = async ({
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

    addFavoriteMutation.mutate({ showData, favoriteId, setLoadingFavorite });
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
            : (error?.message ?? 'Favorite request failed')
        );
        setLoadingFavorite(false);
      });
  };

  return { addFavorite, removeFavorite };
}
