import BattleCard from "../components/BattleCard";
import { battlesObject } from "../battlesObject";

const Battles = () => {
  return (
    <div className="battles">
      <h2 className="greeting">Welcome Back, Emmanuel</h2>
      <div className="card-container">
        {battlesObject.map((battle) => (
          <BattleCard id={battle.id} title={battle.title} description={battle.description} />
        ))}
      </div>
    </div>
  );
};

export default Battles;
