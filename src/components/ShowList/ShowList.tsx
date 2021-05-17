import React, { useState, useEffect } from "react";
import { ShowListProps } from "../../typescript/types";

import "./ShowList.scss";

import ShowCard from "../ShowCard/ShowCard";

export default function ShowList(props: ShowListProps) {
  const { title, shows } = props;
  const [cardAmount, setCardAmount] = useState<number>(4);

  useEffect(() => {
    if (window.screen.width >= 769) {
      setCardAmount(6);
    }
  }, []);

  return (
    <div className="shows">
      <h1>{title}</h1>
      <div className="shows__list">
        {shows &&
          shows.slice(0, cardAmount).map((show) => {
            return <ShowCard key={show.id.toString()} show={show} />;
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
