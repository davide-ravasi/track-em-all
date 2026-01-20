import React from "react";

import "./VoteBox.scss";

type VoteBoxProps = {
  vote: number;
};

export default function VoteBox({ vote }: VoteBoxProps) {
  return (
    <div className="vote-box">
      <span aria-label={`Vote: ${vote.toFixed(1)} out of 10`}>{vote.toFixed(1)}</span>
    </div>
  );
}
