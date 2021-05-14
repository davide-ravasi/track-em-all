import React from "react";
import { Show } from "../../typescript/types";

type ShowProps = {
  show: Show
}

export default function ShowCard(props: ShowProps) {
  const { name, vote_average, poster_path } = props.show;
  return (
    <div className="show__card">
      <span>{vote_average}</span>
      <p>{name}</p>
    </div>
  );
}
