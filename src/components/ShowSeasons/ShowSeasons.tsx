import React from "react";

import ShowEpisodes from "../ShowEpisodes/ShowEpisodes";

type ShowSeasonsProps = {
  nmbrSeasons?: number;
  idShow: string;
};

export default function ShowSeasons(props: ShowSeasonsProps) {
  const { nmbrSeasons, idShow } = props;
  return (
    <div className="">
      {nmbrSeasons &&
        Array.from({ length: nmbrSeasons }, (value, key) => {
          return (
            <div>
              Season {key + 1}
              <ShowEpisodes season={key + 1} idShow={idShow} />
            </div>
          );
        })}
    </div>
  );
}
