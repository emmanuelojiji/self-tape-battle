import React from "react";
import { Link } from "react-router-dom";

const BattleCard = ({ title, description, id }) => {
  return (
    <Link to={`/home/battle/${id}`}>
      <div className="block">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default BattleCard;
