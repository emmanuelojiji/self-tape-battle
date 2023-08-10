import React, { useEffect, useState } from "react";
import "./Header.scss";
import Coins from "./Coins";
import Avatar from "./Avatar";
import { auth, db } from "../firebaseConfig";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import CountUp from "react-countup";

const Header = ({ currentPage, setCurrentPage, setSlidePosition }) => {
  const { user, storedUserId } = useAuth();

  const [headshotURL, setHeadshotURL] = useState();

  const [name, setName] = useState("");

  const [rank, setRank] = useState("");

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "users", storedUserId);
      const getUserHeadshot = async () => {
        try {
          const userDoc = await getDoc(userDocRef);
          setHeadshotURL(userDoc.data().headshot);
          setName(userDoc.data().first_name);
          setRank(userDoc.data().ranking);
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
     
      <div className="header-right">
  
          <Coins />
 

        <Link
          to={`/home/profile/${storedUserId}`}
          className="avatar-name-rank-wrap"
          onClick={() => {
            setCurrentPage("profile");
            setSlidePosition(80);
          }}
        >
          {" "}
          <Avatar size="50" image={headshotURL} borderRadius="100%" />
          <div className="name-rank-wrap">
            <h4>{name}</h4>
            <p>{rank}</p>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
