import React from "react";

import "./VoteBox.scss";

type VoteBoxProps = {
  vote: number;
};

export default function VoteBox({ vote }: VoteBoxProps) {
  return (
    <div className="vote-box">
      <span>{vote.toFixed(1)}</span>
    </div>
  );
}
