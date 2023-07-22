import React from "react";
import { Link } from "react-router-dom";
import "./BattleCard.scss";
import Button from "./Button";

const BattleCard = ({ title, id }) => {
  return (
    <Link to={`/home/battle/${id}`} className={`battle-card`}>
      <div>
        <h3>{title}</h3>
        <Button text="Join battle" type="white" />
      </div>
    </Link>
  );
};

export default BattleCard;
