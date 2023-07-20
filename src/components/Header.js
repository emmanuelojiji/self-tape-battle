import React from "react";
import "./Header.scss";
import Coins from "./Coins";
import Avatar from "./Avatar";
import Headshot from "../media/headshot.jpeg";
import { auth } from "../firebaseConfig";

const Header = () => {
  return (
    <header>
  
      <div className="header-right">
        <h3 onClick={() => auth.signOut()}>Sign out</h3>
        <input type="text" className="search" placeholder="Search for user"></input>
        <Coins />
        <Avatar size="35" image={Headshot} />
      </div>
    </header>
  );
};

export default Header;
