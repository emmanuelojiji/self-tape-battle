import BattleCard from "../components/BattleCard";
import "./Battles.scss";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
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
      <h2 className="greeting">Hi {auth.currentUser.displayName}</h2>
    <h3>Battles</h3>

      <div className="card-container">
        {battles.map((battle) => (
          <BattleCard
            key={battle.id}
            title={battle.name}
            id={battle.id}
            background="#E23E19"
            opacity={!battle.active && "0.5"}
          />
        ))}
      </div>
    </div>
  );
};

export default Battles;
