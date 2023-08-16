import Board from "../components/Board";
import "./Leaderboard.scss";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import UserCard from "../components/UserCard";
import { UNSAFE_useRouteId } from "react-router-dom";

const Leaderboard = () => {
  const [mostActive, setMostActive] = useState([]);
  const [battlesWon, setBattlesWon] = useState([]);

  const getUsers = async () => {
    const usersRef = collection(db, "users");

    const mostActiveQuery = query(
      usersRef,
      orderBy("coins", "desc"),
      limit(10)
    );

    const getMostActiveDocs = await getDocs(mostActiveQuery);

    const activeDocs = getMostActiveDocs.docs.map((doc) => doc.data());

    setMostActive(activeDocs);

    const battlesWonQuery = query(
      usersRef,
      where("battles_won", ">", 0),
      orderBy("battles_won", "desc")
    );

    const getBattlesWonDocs = await getDocs(battlesWonQuery);

    const battlesWonDocs = getBattlesWonDocs.docs.map((doc) => doc.data());

    setBattlesWon(battlesWonDocs);
  };

  useEffect(() => {
    getUsers();
  });

  return (
    <div className="leaderboard app-homepage-page">
      <h1>Leaderboard</h1>
      <div className="board-container">
        <Board
          title="Battles won"
          children={battlesWon.map((user, index) => (
            <div className="board-row">
              <h3>{index + 1}</h3>
              <UserCard
                firstName={user.first_name}
                lastName={user.last_name}
                userId={user.uid}
                image={user.headshot}
                imageSize="50"
              />
            </div>
          ))}
        />

        <Board
          title="Most active"
          children={mostActive.map((user, index) => (
            <div className="board-row">
              <h3>{index + 1}</h3>
              <UserCard
                firstName={user.first_name}
                lastName={user.last_name}
                userId={user.uid}
                image={user.headshot}
                imageSize="50"
              />
            </div>
          ))}
        />
      </div>
    </div>
  );
};

export default Leaderboard;
