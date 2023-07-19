import React from "react";
import "./Header.scss";
import Coins from "./Coins";
import Avatar from "./Avatar";



const Header = () => {
  return (
    <header>
      <h3>Self Tape Battle</h3>
      <div className="header-right">
        <input type="text" className="search"></input>
       <Coins/>
       <Avatar size="30"/>
      </div>
    </header>
  );
};

export default Header;
