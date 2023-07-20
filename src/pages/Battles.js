import BattleCard from "../components/BattleCard";
import { battlesObject } from "../battlesObject";
import "./Battles.scss";
import { authContext } from "../context";
import { useContext } from "react";

const Battles = () => {
  const activeBattle = battlesObject.filter((battle) => battle.active === true);

  const user = useContext(authContext);


  console.log(activeBattle);

  return (
    <div className="battles">
      <h2 className="greeting">Arena</h2>
      

      <div className="row-container">
        <div className="left">
          {activeBattle.map((battle) => (
            <BattleCard
              id={battle.id}
              title={battle.title}
              description={battle.description}
            />
          ))}

          <div className="log"></div>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
};

export default Battles;
