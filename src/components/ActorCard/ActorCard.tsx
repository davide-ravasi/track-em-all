import React from "react";
import { getUrlImages } from "../../utils";
import { Actor } from "../../typescript/types";
import "./ActorCard.scss";

export default function ActorCard(props: Actor) {
  return (
    <div className="actorcard_container">
      <img
        alt={props.character}
        src={getUrlImages("thumb", props.profile_path)}
        width="100px"
      />
      <div className="actorcard_details">
        <div className="actorcard_name">{props.name}</div>
        <div className="actorcard_character">{props.character}</div>
      </div>
    </div>
  );
}
