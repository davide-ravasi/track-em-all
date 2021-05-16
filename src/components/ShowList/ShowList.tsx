import React from "react";
import { ShowListProps } from '../../typescript/types';

import './ShowList.scss';

import ShowCard from '../ShowCard/ShowCard';

export default function ShowList(props: ShowListProps) {
  const { title, shows } = props;
  return (
    <div className="shows">
      <h1>{title}</h1>
      <div className="shows__list">
          {shows && shows.slice(0,4).map((show) => {
            return <ShowCard show={show} />
          })}
      </div>
    </div>
  );
}

/*
      {list &&
        list.map((el) => {
          return el.name;
        })}
*/
