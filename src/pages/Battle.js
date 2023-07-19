import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Battle.scss";
import { battlesObject } from "../battlesObject";
import Button from "../components/Button";

const Battle = () => {
  const { id } = useParams();

  const selectedBattle = battlesObject.find((battle) => battle.id == id);

  return (
    <div>
      <div className="battle-header">
        <div>
          <h1>{selectedBattle.title}</h1>
          <h3>{selectedBattle.description}</h3>
        </div>

        <Button text="Upload tape" />
      </div>
    </div>
  );
};

export default Battle;
