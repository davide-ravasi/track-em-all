import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Categories, Sections } from '../../typescript/types';
import { fetchShows } from './ShowList.utils';

export interface IUseQueryShowProps {
  id?: string;
  section: Sections;
  category: Categories;
  cardAmount?: number;
}

export const useQueryShow = ({
  id,
  section,
  category,
  cardAmount,
}: IUseQueryShowProps) => {
  const totalPages = 6;

  const infiniteResults = useInfiniteQuery({
    queryKey: ['shows', 'infinite', section, category, id],
    queryFn: ({ pageParam }) =>
      fetchShows({ pageParam, section, category, id }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < totalPages ? lastPage.page + 1 : undefined,
    maxPages: 6,
    enabled: !cardAmount,
  });

  const previewResults = useQuery({
    queryKey: ['shows', 'preview', section, category, id],
    queryFn: () => fetchShows({ pageParam: 1, section, category, id }),
    enabled: !!cardAmount,
  });

  if (cardAmount) {
    return {
      shows: previewResults.data?.results.slice(0, cardAmount),
      error: previewResults.error,
      isLoading: previewResults.isLoading,
      fetchNextPage: () => {},
      hasNextPage: false,
      isFetchingNextPage: false,
    };
  }

  return {
    shows: infiniteResults.data?.pages.flatMap((page) => page.results),
    error: infiniteResults.error,
    isLoading: infiniteResults.isLoading,
    fetchNextPage: infiniteResults.fetchNextPage,
    hasNextPage: infiniteResults.hasNextPage,
    isFetchingNextPage: infiniteResults.isFetchingNextPage,
  };
};
