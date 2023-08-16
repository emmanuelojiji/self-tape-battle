import "./Aside.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../media/logo-white.svg";
import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { useAuth } from "../AuthContext";
import arena from "../media/icon-arena.svg";
import profile from "../media/icon-profile.svg";
import directory from "../media/icon-search.svg";

const Aside = ({
  currentPage,
  setCurrentPage,
  slidePosition,
  setSlidePosition,
}) => {
  const navigate = useNavigate();

  const { user, storedUserId } = useAuth();

  const handleSetSlidePosition = (number) => {
    console.log("Setting slide position:", number);
    setSlidePosition(number);
    console.log("Slide position after set:", slidePosition);
  };

  return (
    <aside>
      
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
            handleSetSlidePosition(0);
          }}
        >
          <div
            className={`nav-icon ${currentPage === "arena" ? "active" : null}`}
          >
            <svg
              className="test-svg"
              width="30"
              height="30"
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
          to="/home/leaderboard"
          className={currentPage === "leaderboard" ? "active" : null}
          onClick={() => {
            setCurrentPage("leaderboard");
            handleSetSlidePosition(80);
          }}
        >
          <div
            className={`nav-icon ${
              currentPage === "leaderboard" ? "active" : null
            }`}
          >
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8325 19.6445H6.83252M12.8325 19.6445V11.2445C12.8325 11.0854 12.7693 10.9328 12.6568 10.8203C12.5443 10.7078 12.3916 10.6445 12.2325 10.6445H7.43252C7.27339 10.6445 7.12078 10.7078 7.00826 10.8203C6.89573 10.9328 6.83252 11.0854 6.83252 11.2445V19.6445M12.8325 19.6445H18.2325C18.3916 19.6445 18.5443 19.5813 18.6568 19.4688C18.7693 19.3563 18.8325 19.2037 18.8325 19.0445V16.7445C18.8325 16.5854 18.7693 16.4328 18.6568 16.3203C18.5443 16.2078 18.3916 16.1445 18.2325 16.1445H13.4325C13.2734 16.1445 13.1208 16.2078 13.0083 16.3203C12.8957 16.4328 12.8325 16.5854 12.8325 16.7445V19.6445ZM6.83252 19.6445V14.7445C6.83252 14.5854 6.76931 14.4328 6.65678 14.3203C6.54426 14.2078 6.39165 14.1445 6.23252 14.1445H1.43252C1.27339 14.1445 1.12078 14.2078 1.00826 14.3203C0.895734 14.4328 0.83252 14.5854 0.83252 14.7445V19.0445C0.83252 19.2037 0.895734 19.3563 1.00826 19.4688C1.12078 19.5813 1.27339 19.6445 1.43252 19.6445H6.83252ZM8.63852 3.75755L9.54752 1.83055C9.57206 1.77546 9.61204 1.72866 9.66262 1.69583C9.7132 1.66299 9.77221 1.64551 9.83252 1.64551C9.89283 1.64551 9.95184 1.66299 10.0024 1.69583C10.053 1.72866 10.093 1.77546 10.1175 1.83055L11.0275 3.75755L13.0595 4.06855C13.3205 4.10855 13.4245 4.44455 13.2355 4.63655L11.7655 6.13655L12.1125 8.25455C12.1565 8.52655 11.8845 8.73455 11.6505 8.60555L9.83252 7.60555L8.01452 8.60555C7.78152 8.73355 7.50852 8.52655 7.55252 8.25455L7.89952 6.13655L6.42952 4.63655C6.23952 4.44455 6.34452 4.10855 6.60452 4.06855L8.63852 3.75755Z"
                stroke={currentPage === "leaderboard" ? "white" : "#656c81"}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </Link>
        <Link
          to={`/home/profile/${storedUserId}`}
          className={currentPage === "profile" ? "active" : null}
          onClick={() => {
            setCurrentPage("profile");
            handleSetSlidePosition(160);
          }}
        >
          <svg
            width="30"
            height="30"
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
            handleSetSlidePosition(240);
          }}
        >
          <svg
            width="30"
            height="30"
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
