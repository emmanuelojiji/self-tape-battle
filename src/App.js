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

function App() {
  const { user, storedUserId } = useAuth();

  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const [onboardingComplete, setOnboardingComplete] = useState();

  console.log(onboardingComplete);

  return (
    <BrowserRouter>
      <div className="App">
        <div className="notice">
          <Homepage />
        </div>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          {storedUserId === "8rKN8dr2sfY1WbEMxBtsJYF5yc23" && (
            <Route path="/admin" element={<Admin />}></Route>
          )}

          <Route
            path="/home"
            element={storedUserId ? <AppHomepage /> : <Navigate to="/login" />}
          >
            <Route path="/home/profile/:id" element={<Profile />}></Route>
            <Route path="leaderboard" element={<Leaderboard />}></Route>
            <Route path="battles" element={<Battles />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="directory" element={<Directory />}></Route>
            <Route path="wallet" element={<Wallet />}></Route>

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
