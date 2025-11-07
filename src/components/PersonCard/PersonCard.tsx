import React from "react";
import { getUrlImages } from "../../utils";
import { Person } from "../../typescript/types";
import "./PersonCard.scss";

interface PersonCardProps {
  person: Person;
}

export default function PersonCard(props: PersonCardProps) {
  const {
    person: { profile_path, id, name, character },
  } = props;

  return (
    <article className="personcard_container">
      <img
        alt={character}
        src={getUrlImages("thumb", profile_path)}
        width="100px"
      />
      <div className="personcard_details">
        <div className="personcard_name">
          <a href={`/person/${id}`}>{name}</a>
        </div>
        <div className="personcard_character">{character}</div>
      </div>
    </article>
  );
}
