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
import RedirectToLogin from "./components/RedirectToLogin";
import Leaderboard from "./pages/Leaderboard";
import Battles from "./pages/Battles";
import Battle from "./pages/Battle";
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, collection } from "firebase/firestore";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import UploadModal from "./components/UploadModal";
import Directory from "./pages/Directory";
import Wallet from "./pages/Wallet";
import Homepage from "./pages/Homepage";
import { useAuth } from "./AuthContext";

function App() {
  //const user = localStorage.getItem("currentUser");

  const user = useAuth();

  if (user) {
    console.log("New User is:" + user.uid);
  }

  const [uploadModalVisible, setUploadModalVisible] = useState(false);

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
          <Route path="/admin" element={<Admin />}></Route>

          <Route path="/onboarding" element={<Onboarding />}></Route>

          <Route path="/home" element={<AppHomepage />}>
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

          <Route path="*" element={<SignUp />} />
          <Route
            path="/"
            element={user ? <Navigate to="/home/battles" /> : <LogIn />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
