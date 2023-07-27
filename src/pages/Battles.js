import BattleCard from "../components/BattleCard";
import { battlesObject } from "../battlesObject";
import "./Battles.scss";
import { authContext } from "../context";
import { useContext, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useState } from "react";

const Battles = () => {
  const [battles, setBattles] = useState([]);
  useEffect(() => {
    const getActiveBattle = async () => {
      try {
        const battlesCollectionRef = collection(db, "battles");
        const battlesDocs = await getDocs(battlesCollectionRef);

        const battlesDocsData = battlesDocs.docs.map((doc) => doc.data());

        setBattles(battlesDocsData);
      } catch (error) {
        console.log(error);
      }
    };
    getActiveBattle();
  }, []);



  const [activeBattle, setActiveBattle] = useState();
  return (
    <div className="battles">
      <h2 className="greeting">Battles</h2>

      <div className="card-container">
        {battles.map((battle) => (
          <BattleCard key={battle.id} title={battle.name} id={battle.id} />
        ))}
      </div>
    </div>
  );
};

export default Battles;
