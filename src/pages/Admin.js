import React from "react";
import "./Admin.scss";
import InputText from "../components/InputText";
import { db } from "../firebaseConfig";
import { useState } from "react";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

const Admin = () => {
  const [battleName, setBattleName] = useState("");

  let battle_id = battleName.replace(/\s/g, "-");

  const createBattle = async () => {
    try {
      const battleDocRef = doc(db, "battles", battle_id);

      const dateToday = new Date();

      const oneWeekLater = new Date(dateToday);

      oneWeekLater.setDate(dateToday.getUTCDate() + 7);

      await setDoc(battleDocRef, {
        name: battleName,
        id: battle_id,
        active: true,
        date: dateToday,
        deadline: oneWeekLater,
      });
    } catch (error) {
      console.log("Error creating battle:", error);
    }
  };

  console.log(battle_id);

  return (
    <div className="admin">
      <div className="content">
        <h1>Create Battle</h1>
        <InputText
          placeholder="Battle Name"
          onChange={(e) => {
            setBattleName(e.target.value);
            console.log(battleName);
          }}
        />
        <button onClick={() => createBattle()}>Create</button>
      </div>
    </div>
  );
};

export default Admin;
