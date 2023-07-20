import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import "./AppHomepage.scss";
import Battles from "./Battles";

import { Routes, Route, Outlet } from "react-router-dom";
import Leaderboard from "./Leaderboard";
import Aside from "../components/Aside";
import Header from "../components/Header";

const AppHomepage = () => {
  return (
    <div className="app-homepage">
        <Aside/>
      

      <main>
      <Header/>

        <div className="app-homepage-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppHomepage;
