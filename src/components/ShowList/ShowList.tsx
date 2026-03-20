import React from 'react';
import { Categories, Person, Sections, Show } from '../../typescript/types';

import './ShowList.scss';

import ShowCard from '../ShowCard/ShowCard';
import { en } from '../../trads/en';
import PersonCard from '../PersonCard/PersonCard';
import Loader from '../Loader/Loader';
import { useQueryShow } from './useQueryShow';

/*
 * ShowList component
 * @param {ShowListProps} props
 * @returns {JSX.Element}
 * @constructor
 * @memberof ShowList
 * @example
 * <ShowList title="Your Favorite Shows" section="tv" category="favorites" cardAmount={24} />
 */

/*
  @todo - remove slice from map and add in setState
  @todo - remove results near map and add it when fetching data
*/

export interface ShowListProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
  section: Sections;
  linkMore?: boolean;
  category: Categories;
  id?: string;
  cardAmount?: number;
}

export default function ShowList({
  title,
  section,
  linkMore = true,
  category,
  id,
  cardAmount,
  ...props
}: ShowListProps) {
  const {
    shows,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useQueryShow({ section, category, id, cardAmount });

  const handleAddCards = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const sectionTitle = title ? title : en.categories[category].title;

  if (isLoading) {
    return (
      <div
        className='loader'
        aria-live='polite'
        aria-atomic='true'
        role='status'
        aria-label={`Loading ${sectionTitle}`}
      >
        <Loader aria-hidden='true' aria-busy='true' />
      </div>
    );
  }
  if (error) {
    return (
      <div className='loading-error' role='alert'>
        Failed to load {sectionTitle}. {error?.message}
      </div>
    );
  }

  return (
    <section className='shows' {...props}>
      <h1>
        {sectionTitle}{' '}
        {cardAmount && linkMore && (
          <a
            className='shows__show-more'
            href={`/list/${section}/${id ? id + '/' : ''}${category}`}
          >
            {'show more >'}
          </a>
        )}
      </h1>
      {!shows ||
        (shows.length === 0 && <p>No {sectionTitle.toLowerCase()} found.</p>)}
      <div className='shows__list'>
        {shows &&
          shows.map((show: Show | Person) => {
            return section !== 'person' ? (
              <ShowCard key={show.id.toString()} show={show as Show} />
            ) : (
              <PersonCard person={show as Person} />
            );
          })}
      </div>
      <div className='shows__show-more-elements'>
        {hasNextPage && !cardAmount && (
          <button
            type='button'
            onClick={(e) => handleAddCards(e)}
            aria-label={`Load more ${sectionTitle.toLowerCase()}`}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Show more'}
          </button>
        )}
      </div>
    </section>
  );
}
