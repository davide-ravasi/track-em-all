import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sections, Show } from '../../typescript/types';
import ShowList from '../../components/ShowList/ShowList';
import Search from '../../components/Search/Search';
import SearchBar from '../../components/SearchBar/SearchBar';
import { Categories } from '../../typescript/types';
import '../../components/Search/Search.scss';
import { getSearchUrl } from '../../utils';
import { en } from '../../trads/en';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';

export default function HomePage() {
  const [textInput, setTextInput] = useState('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [recommendedId, setRecommendedId] = useState<string>();
  const [recommendedName, setRecommendedName] = useState<string>();
  const [hideHomepageContents, setHideHomepageContents] = useState(false);
  const { user, favorites } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (favorites !== null && favorites.length) {
      const randomFavoritesIndex = Math.floor(Math.random() * favorites.length);

      setRecommendedId(favorites[randomFavoritesIndex].showId);
      setRecommendedName(favorites[randomFavoritesIndex].name);
    }

    // url example
    // https://api.themoviedb.org/3/tv/series_id/recommendations?language=en-US&page=1
    // https://api.themoviedb.org/3/tv/1396/recommendations?api_key=b61f13ab08388482df500390ef8de990&language=en-US&page=1
  }, [user, favorites]);

  // Hooks must run at component top level — not inside submit handlers.
  // Submit only updates `searchTerm`; this query fetches when it is non-empty.
  const {
    data: searchResults = [],
    error: searchQueryError,
    isLoading,
  } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: async () => {
      const res = await fetch(getSearchUrl(searchTerm));
      if (!res.ok) throw new Error('Failed to fetch search results');
      const data = await res.json();
      return data.results as Show[];
    },
    enabled: !!searchTerm,
  });

  const getSearchData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = textInput.trim();
    if (!trimmed) return;
    setSearchTerm(trimmed);
    setHideHomepageContents(true);
  };

  return (
    <main id='main-content' className='page'>
      <div className='page__content-wrapper'>
        <h1 className='page__title'>Track&apos;em All - Discover TV Shows</h1>
        <SearchBar
          textInput={textInput}
          setTextInput={setTextInput}
          getSearchData={getSearchData}
        />
        {searchQueryError && (
          <div className='loading-error' role='alert'>
            {searchQueryError?.message}
          </div>
        )}
        {isLoading && (
          <div
            className='loader'
            aria-live='polite'
            aria-atomic='true'
            role='status'
            aria-label='Loading search results'
          >
            <Loader aria-hidden='true' aria-busy='true' />
          </div>
        )}
        {!hideHomepageContents && !isLoading ? (
          <>
            <ShowList
              section={Sections.Tv}
              category={Categories.Popular}
              cardAmount={6}
              data-testid='section-tv-shows'
            />

            <ShowList
              section={Sections.Tv}
              category={Categories.TopRated}
              cardAmount={6}
              data-testid='section-top-rated'
            />

            {recommendedId && recommendedName && (
              <ShowList
                title={`because you liked:  ${recommendedName}`}
                section={Sections.Tv}
                category={Categories.Recommended}
                id={recommendedId}
                cardAmount={6}
                data-testid='section-recommended'
              />
            )}

            <ShowList
              title={en.categories.personpopular.title}
              section={Sections.Person}
              category={Categories.Popular}
              cardAmount={6}
              data-testid='section-person-popular'
            />
          </>
        ) : (
          <>
            <Search shows={searchResults} />
          </>
        )}
      </div>
    </main>
  );
}
