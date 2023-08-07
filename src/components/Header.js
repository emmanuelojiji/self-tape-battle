import React, { useEffect, useState } from "react";
import "./Header.scss";
import Coins from "./Coins";
import Avatar from "./Avatar";
import { auth, db } from "../firebaseConfig";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import CountUp from 'react-countup';



const Header = () => {
  const { user, storedUserId } = useAuth();

  const [headshotURL, setHeadshotURL] = useState();



  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", storedUserId);
      const getUserHeadshot = async () => {
        try {
          const userDoc = await getDoc(userDocRef);
          setHeadshotURL(userDoc.data().headshot);
        } catch {
          console.log("Couldn't get user doc!");
        }
      };

      getUserHeadshot();
    }
  }, [user]);

  const navigate = useNavigate();
  return (
    <header>
   

      <input
        type="text"
        className="search"
        placeholder="Search for user"
      ></input>
      <div className="header-right">
        <div className="stats-container">
          <Coins />
        </div>

        <Link to={`/home/profile/${storedUserId}`}>
          {" "}
          <Avatar size="35" image={headshotURL} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
