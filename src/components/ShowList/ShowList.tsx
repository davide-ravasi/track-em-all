import React from "react";

type ShowListProps = {
  title: string;
};

export default function ShowList(props: ShowListProps) {
  const { title } = props;
  return (
    <div className="show-list">
      <h1>{title}</h1>
    </div>
  );
}

/*
      {list &&
        list.map((el) => {
          return el.name;
        })}
*/
