import React from "react";
import { Link } from "react-router-dom";
import "./BattleCard.scss";
import Button from "./Button";

const BattleCard = ({ title, id, background }) => {
  return (
    <Link
      to={`/home/battle/${id}`}
      className={`battle-card`}
      style={{ background: background }}
    >
      <h3>{title}</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec malesuada
        nisi nisl.
      </p>
      <Button text="Join battle" type="white" />
    </Link>
  );
};

export default BattleCard;
