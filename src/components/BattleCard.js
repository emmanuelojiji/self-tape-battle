import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./BattleCard.scss";
import Button from "./Button";

const BattleCard = ({ title, id, background, opacity }) => {
  const colours = [
    { color: "red", hexCode: "red" },
    { color: "blue", hexCode: "blue" },
    { color: "pink", hexCode: "pink" },
  ];

  let randomNumber = Math.floor(Math.random() * colours.length);

  const randomColor = colours[randomNumber].hexCode;

  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber]);

  return (
    <Link
      to={`/home/battle/${id}`}
      className={`battle-card`}
      style={{ background: randomColor, opacity: opacity }}
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
