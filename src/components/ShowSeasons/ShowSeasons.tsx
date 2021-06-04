import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import ShowEpisodes from "../ShowEpisodes/ShowEpisodes";

import "./ShowSeasons.scss";

type ShowSeasonsProps = {
  nmbrSeasons?: number;
  idShow: string;
};

export default function ShowSeasons(props: ShowSeasonsProps) {
  const { nmbrSeasons, idShow } = props;
  const [showBoxSeasons, setShowBoxSeasons] = useState(false);
  const toggleSeasons = () => {
    setShowBoxSeasons(!showBoxSeasons);
  };
  return (
    <>
      <button
        type="button"
        className="toggleSeasons"
        onClick={() => {
          toggleSeasons();
        }}
      >
        {showBoxSeasons ? "Hide all the episodes" : "Show all the episodes"}
        {showBoxSeasons ? (
          <FontAwesomeIcon icon={faAngleUp} />
        ) : (
          <FontAwesomeIcon icon={faAngleDown} />
        )}
      </button>
      {showBoxSeasons && (
        <div>
          {nmbrSeasons &&
            Array.from({ length: nmbrSeasons }, (value, key) => {
              const nmbrSeason = key + 1;
              return (
                <div className="season" key={"season" + nmbrSeason}>
                  <h2>Season {nmbrSeason}</h2>
                  <ShowEpisodes season={nmbrSeason} idShow={idShow} />
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}
