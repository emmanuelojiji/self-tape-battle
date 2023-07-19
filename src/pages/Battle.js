import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Battle.scss";
import { battlesObject } from "../battlesObject";

const Battle = () => {
  const { id } = useParams();

  const selectedBattle = battlesObject.find((battle) => battle.id == id);

  return (
    <div>
      <h1>{selectedBattle.title}</h1>
      <h3>{selectedBattle.description}</h3>
    </div>
  );
};

export default Battle;
