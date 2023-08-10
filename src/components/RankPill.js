import React from "react";
import "./RankPill.scss";

const RankPill = ({ rank }) => {
  const rankDisplay = rank.replace("_", " ");

  return <div className={`rank-pill ${rank}`}>{rankDisplay}</div>;
};

export default RankPill;
