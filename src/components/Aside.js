import "./Aside.scss";
import { Link, useParams } from "react-router-dom";
import Logo from "../media/logo.svg";
import { useEffect, useState } from "react";

const Aside = () => {
  const [currentPage, setCurrentPage] = useState("");

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const user = localStorage.getItem("currentUser");

  return (
    <aside>
      <img src={Logo} className="logo" />
      <nav>
        <Link
          to={`/home/profile/${user}`}
          className={currentPage === "profile" ? "active" : null}
          onClick={() => setCurrentPage("profile")}
        >
          Profile
        </Link>
        <Link
          to="/home/battles"
          className={currentPage === "arena" ? "active" : null}
          onClick={() => setCurrentPage("arena")}
        >
          Arena
        </Link>

        <Link to="/home/directory">Directory</Link>
        <Link className="disabled">Wallet</Link>
        <Link className="disabled">Leaderboard</Link>

        <Link className="disabled">Shop</Link>
        <Link className="disabled">Green Room</Link>
      </nav>
    </aside>
  );
};

export default Aside;
