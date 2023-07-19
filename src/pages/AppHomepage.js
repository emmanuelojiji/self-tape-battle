import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import "./AppHomepage.scss";
import Battles from "./Battles";
import Coins from "./Coins";
import { Routes, Route, Outlet } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Aside from "../components/Aside";

const AppHomepage = () => {
  return (
    <div className="app-homepage">
      <header>
        <h3>Self Tape Battle</h3>
        <div className="header-right">
          <input type="text" className="search"></input>
          <Coins />
          <Avatar size="30" />
        </div>
      </header>

      <main>
        <Aside/>

        <div className="app-homepage-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppHomepage;
