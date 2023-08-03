import React, { useEffect, useState } from "react";
import "./Header.scss";
import Coins from "./Coins";
import Avatar from "./Avatar";
import { auth, db } from "../firebaseConfig";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const Header = () => {
  const currentUser = localStorage.getItem("currentUser");
  const userDocRef = doc(db, "users", currentUser);

  const [headshotURL, setHeadshotURL] = useState();

  useEffect(() => {
    const getUserHeadshot = async () => {
      try {
        const userDoc = await getDoc(userDocRef);
        setHeadshotURL(userDoc.data().headshot);
      } catch {
        console.log("Couldn't get user doc!");
      }
    };

    getUserHeadshot();
  });

  const navigate = useNavigate();
  return (
    <header>
      <input
        type="text"
        className="search"
        placeholder="Search for user"
      ></input>
      <div className="header-right">
        <Coins />
        <Link to="/home/profile">
          {" "}
          <Avatar size="35" image={headshotURL} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
