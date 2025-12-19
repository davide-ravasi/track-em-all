import React from "react";
import { Link } from "react-router-dom";
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
        alt={character ? `${name} as ${character}` : `${name} profile`}
        src={getUrlImages("thumb", profile_path)}
        width="100px"
      />
      <div className="personcard_details">
        <div className="personcard_name">
          <Link to={`/person/${id}`}>{name}</Link>
        </div>
        {character && <div className="personcard_character">{character}</div>}
      </div>
    </article>
  );
}
