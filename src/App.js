import "./App.scss";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Onboarding from "./pages/Onboarding";
import AppHomepage from "./pages/AppHomepage";
import Leaderboard from "./pages/Leaderboard";
import Battles from "./pages/Battles";
import Battle from "./pages/Battle";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Directory from "./pages/Directory";
import Wallet from "./pages/Wallet";
import Homepage from "./pages/Homepage";
import { useAuth } from "./AuthContext";
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import PraiseModal from "./components/PraiseModal";

function App() {
  const { user, storedUserId } = useAuth();

  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const [onboardingComplete, setOnboardingComplete] = useState();

  const [currentPage, setCurrentPage] = useState("arena");
  const [slidePosition, setSlidePosition] = useState(0);

  const [isFirstLogIn, setIsFirstLogIn] = useState(false);

  console.log(onboardingComplete);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="notice">
    
        </div>
        <Routes>
      
          <Route path="/login" element={<LogIn />}></Route>
          <Route
            path="/signup"
            element={
              <SignUp
                isFirstLogIn={isFirstLogIn}
                setIsFirstLogIn={setIsFirstLogIn}
              />
            }
          ></Route>
          {storedUserId === "yO8dJM33Qqayb0VZjZAdSOJdOM42" && (
            <Route path="/admin" element={<Admin />}></Route>
          )}

          <Route
            path="/home"
            element={
              storedUserId ? (
                <AppHomepage
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  slidePosition={slidePosition}
                  setSlidePosition={setSlidePosition}
                  isFirstLogIn={isFirstLogIn}
                  setIsFirstLogIn={setIsFirstLogIn}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route
              path="/home/profile/:id"
              element={
                <Profile
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setSlidePosition={setSlidePosition}
                />
              }
            ></Route>

            <Route
              path="/home/profile/"
              element={<Navigate to={`/home/profile/${storedUserId}`} />}
            ></Route>

            <Route
              path="battles"
              element={
                <Battles
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setSlidePosition={setSlidePosition}
                />
              }
            ></Route>

            <Route path="leaderboard" element={<Leaderboard />}></Route>
            <Route
              path="profile"
              element={
                <Profile
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setSlidePosition={setSlidePosition}
                />
              }
            ></Route>
            <Route
              path="directory"
              element={
                <Directory
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  setSlidePosition={setSlidePosition}
                />
              }
            ></Route>

            <Route
              path="battle/:id"
              element={
                <Battle
                  uploadModalVisible={uploadModalVisible}
                  setUploadModalVisible={setUploadModalVisible}
                />
              }
            ></Route>
            <Route path="/home" element={<Battles />}></Route>
          </Route>

          <Route
            path="/"
            element={storedUserId ? <Navigate to="/home/battles" /> : <LogIn />}
          ></Route>
          <Route path="*" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
