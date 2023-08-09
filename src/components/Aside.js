import "./Aside.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../media/logo-white.svg";
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
            <svg
              className="test-svg"
              width="25"
              height="25"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.92969 7.11328L3.92969 9.61328V4.61328L8.92969 7.11328ZM22.6797 4.61328V9.61328L27.6797 7.11328L22.6797 4.61328ZM13.9297 3.36328V8.36328L18.9297 5.86328L13.9297 3.36328ZM16.4297 23.3633H13.9297V28.3633C7.55469 28.2383 2.67969 26.6133 2.67969 24.6133V13.3633C2.67969 11.2383 8.30469 9.61328 15.1797 9.61328C22.0547 9.61328 27.6797 11.2383 27.6797 13.3633V24.6133C27.6797 26.6133 22.6797 28.2383 16.4297 28.3633V23.3633ZM6.42969 13.3633C8.17969 13.9883 11.1797 14.6133 15.1797 14.6133C19.1797 14.6133 22.1797 13.9883 23.9297 13.3633C23.9297 13.1133 20.4297 12.1133 15.1797 12.1133C9.92969 12.1133 6.42969 13.2383 6.42969 13.3633ZM25.1797 15.6133C22.9297 16.4883 19.3047 17.1133 15.1797 17.1133C11.0547 17.1133 7.42969 16.4883 5.17969 15.6133V24.1133C5.92969 24.6133 8.17969 25.3633 11.4297 25.7383V20.8633H18.9297V25.7383C22.1797 25.3633 24.4297 24.6133 25.1797 24.1133V15.6133Z"
                fill={currentPage === "arena" && "white"}
                className="icon-path"
              />
            </svg>
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
          <svg
            width="25"
            height="25"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.17969 22.666C5.17969 21.3399 5.70647 20.0682 6.64415 19.1305C7.58184 18.1928 8.85361 17.666 10.1797 17.666H20.1797C21.5058 17.666 22.7775 18.1928 23.7152 19.1305C24.6529 20.0682 25.1797 21.3399 25.1797 22.666C25.1797 23.3291 24.9163 23.9649 24.4475 24.4338C23.9786 24.9026 23.3427 25.166 22.6797 25.166H7.67969C7.01665 25.166 6.38076 24.9026 5.91192 24.4338C5.44308 23.9649 5.17969 23.3291 5.17969 22.666Z"
              stroke={currentPage === "profile" ? "white" : "#656c81"}
              stroke-width="2"
              stroke-linejoin="round"
              className="icon-stroke"
            />
            <path
              d="M15.1797 12.666C17.2508 12.666 18.9297 10.9871 18.9297 8.91602C18.9297 6.84495 17.2508 5.16602 15.1797 5.16602C13.1086 5.16602 11.4297 6.84495 11.4297 8.91602C11.4297 10.9871 13.1086 12.666 15.1797 12.666Z"
              stroke={currentPage === "profile" ? "white" : "#656c81"}
              stroke-width="2"
            />
          </svg>
        </Link>

        <Link
          to="/home/directory"
          className={currentPage === "directory" ? "active" : null}
          onClick={() => {
            setCurrentPage("directory");
            setSlidePosition(80 * 2);
          }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.4297 26.7202L18.9297 19.2202M3.92969 12.9702C3.92969 14.1193 4.15601 15.2571 4.59574 16.3187C5.03547 17.3803 5.67999 18.3449 6.4925 19.1574C7.30502 19.9699 8.26961 20.6144 9.33121 21.0542C10.3928 21.4939 11.5306 21.7202 12.6797 21.7202C13.8288 21.7202 14.9666 21.4939 16.0282 21.0542C17.0898 20.6144 18.0544 19.9699 18.8669 19.1574C19.6794 18.3449 20.3239 17.3803 20.7636 16.3187C21.2034 15.2571 21.4297 14.1193 21.4297 12.9702C21.4297 11.8211 21.2034 10.6833 20.7636 9.62173C20.3239 8.56014 19.6794 7.59554 18.8669 6.78303C18.0544 5.97052 17.0898 5.326 16.0282 4.88627C14.9666 4.44654 13.8288 4.22021 12.6797 4.22021C11.5306 4.22021 10.3928 4.44654 9.33121 4.88627C8.26961 5.326 7.30502 5.97052 6.4925 6.78303C5.67999 7.59554 5.03547 8.56014 4.59574 9.62173C4.15601 10.6833 3.92969 11.8211 3.92969 12.9702Z"
              stroke={currentPage === "directory" ? "white" : "#656C81"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
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
