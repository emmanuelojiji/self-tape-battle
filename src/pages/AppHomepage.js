import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import "./AppHomepage.scss";
import Battles from "./Battles";
import Coins from "./Coins";
import { Routes, Route, Outlet } from "react-router-dom";
import Leaderboard from "./Leaderboard";

const AppHomepage = () => {
  return (
    <div className="app-homepage">
      <header>
        <h3>Self Tape Battle</h3>
        <div className="header-right">
          <Coins />
          <Avatar size="30" />
        </div>
      </header>

      <main>
        <aside>
          <Link to="/battles">Battles</Link>
          <Link>Leaderboard</Link>
          <Link>Shop</Link>
          <Link>Green Room</Link>
        </aside>

        <div className="app-homepage-content">
          <Routes>
            <Route path="/" element={<Battles />} />
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route path="/battles" element={<Battles />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AppHomepage;
