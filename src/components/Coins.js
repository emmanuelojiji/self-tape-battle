import "./Coins.scss";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";

const Coins = () => {
  const user = auth.currentUser;
  const [coins, setCoins] = useState();
  useEffect(() => {
    const getCoins = async () => {
      try {
        const userDocumentRef = doc(db, "users", user.uid);
        const userDocument = await getDoc(userDocumentRef);
        setCoins(userDocument.data().coins);
       
      } catch (error) {
        console.log(error.message);
      }
    };
    getCoins();
  });
  return (
    <div className="coins-container">
      <div className="coin"></div>
      {coins}
    </div>
  );
};

export default Coins;
