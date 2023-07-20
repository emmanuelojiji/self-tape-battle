import React from "react";
import "./Header.scss";
import Coins from "./Coins";
import Avatar from "./Avatar";
import Headshot from "../media/headshot.jpeg";
import { auth } from "../firebaseConfig";
import { Navigate, useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header-right">
        <h3
          onClick={() => {
            auth.signOut();
            navigate("/login");
          }}
        >
          Sign out
        </h3>
        <input
          type="text"
          className="search"
          placeholder="Search for user"
        ></input>
        <Coins />
        <Link to="/home/profile">
          {" "}
          <Avatar size="35" image={Headshot} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
