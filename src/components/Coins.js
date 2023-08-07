import "./Coins.scss";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import CountUp from "react-countup";

const Coins = () => {
  const [user, setUser] = useState();
  const [coins, setCoins] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        getCoins();
      } else {
        setUser(null);
      }
    });

    const getCoins = async () => {
      try {
        if (user) {
          const userDocumentRef = doc(db, "users", user.uid);
          const userDocument = await getDoc(userDocumentRef);
          setCoins(userDocument.data().coins);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  });

  return (
    <div className="coins-container">
      <div className="coin"></div>
      <CountUp end={coins} duration={5} />
    </div>
  );
};

export default Coins;
