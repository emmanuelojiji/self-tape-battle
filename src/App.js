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

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is authenticated, store the user object in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } else {
        // If the user is not authenticated, remove the user object from localStorage
        localStorage.removeItem("user");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  /*const [onboardingComplete, setOnboardingComplete] = useState();

  const onboardingCheck = async () => {
    try {
      const docSnapshot = await getDoc(doc(db, "users", user.uid));

      if (docSnapshot.data().onboarding_complete) {
        setOnboardingComplete(true);
      }
    } catch {
      console.log("couldn't get document");
    }
  };
  onboardingCheck();*/

  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  return (
    <BrowserRouter>
      <UploadModal uploadModalVisible={uploadModalVisible} setUploadModalVisible={setUploadModalVisible} />
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/admin" element={<Admin />}></Route>

          <Route
            path="/onboarding"
            element={user ? <Onboarding /> : <Navigate to="/login" />}
          ></Route>

          <Route
            path="/home"
            element={user ? <AppHomepage /> : <Navigate to="/login" />}
          >
            <Route path="leaderboard" element={<Leaderboard />}></Route>
            <Route path="battles" element={<Battles />}></Route>
            <Route path="profile" element={<Profile />}></Route>
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
