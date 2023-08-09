import "./Aside.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../media/logo-orange.svg";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useAuth } from "../AuthContext";
import arena from "../media/icon-arena.svg";
import profile from "../media/icon-profile.svg";
import directory from "../media/icon-search.svg";

const Aside = () => {
  const [currentPage, setCurrentPage] = useState("arena");

  const navigate = useNavigate();

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const { user, storedUserId } = useAuth();

  const [slidePosition, setSlidePosition] = useState(0);

  return (
    <aside>
      <img src={Logo} className="logo" />
      <nav>
        <div
          className="nav-slider"
          style={{ transform: `translateY(${slidePosition}px)` }}
        ></div>
        <Link
          to="/home/battles"
          className={currentPage === "arena" ? "active" : null}
          onClick={() => {
            setCurrentPage("arena");
            setSlidePosition(0);
          }}
        >
          <div
            className={`nav-icon ${currentPage === "arena" ? "active" : null}`}
          >
            <img src={arena} />
          </div>
        </Link>
        <Link
          to={`/home/profile/${storedUserId}`}
          className={currentPage === "profile" ? "active" : null}
          onClick={() => {
            setCurrentPage("profile");
            setSlidePosition(80);
          }}
        >
          <img src={profile} />
        </Link>

        <Link
          to="/home/directory"
          className={currentPage === "directory" ? "active" : null}
          onClick={() => {
            setCurrentPage("directory");
            setSlidePosition(80 * 2);
          }}
        >
          <img src={directory} />
        </Link>
      </nav>
      <p
        onClick={async () => {
          //auth.signOut();
          try {
            auth.signOut();
          } catch {
            console.log("couldn't sign out");
          }
          localStorage.removeItem("currentUser");

          navigate("/login");
        }}
        className="sign-out"
      >
        Sign out
      </p>
    </aside>
  );
};

export default Aside;
