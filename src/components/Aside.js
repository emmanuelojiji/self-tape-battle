import "./Aside.scss";
import { Link, useParams } from "react-router-dom";
import Logo from "../media/logo.svg";
import { useEffect, useState } from "react";

const Aside = () => {
  const [currentPage, setCurrentPage] = useState("");

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <aside>
      <img src={Logo} className="logo" />
      <nav>
      <Link
          to="/home/profile"
          className={currentPage === "profile" && "active"}
          onClick={() => setCurrentPage("profile")}
        >
          Profile
        </Link>
        <Link
          to="/home/battles"
          className={currentPage === "arena" && "active"}
          onClick={() => setCurrentPage("arena")}
        >
          Arena
        </Link>
        <Link
          to="/home/leaderboard"
          className={currentPage === "leaderboard" && "active"}
          onClick={() => setCurrentPage("leaderboard")}
        >
          Leaderboard
        </Link>
        <Link>Directory</Link>
        <Link className="disabled">Shop</Link>
        <Link className="disabled">Green Room</Link>
      </nav>
    </aside>
  );
};

export default Aside;
