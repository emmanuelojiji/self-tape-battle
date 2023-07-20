import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

  /*onboardingCheck = () => {
    try{

    }
  }*/

  const [testState, setTestState] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          {testState && (
            <Route
              path="/onboarding"
              element={user ? <Onboarding /> : <RedirectToLogin />}
            ></Route>
          )}

          <Route
            path="/home"
            element={user ? <AppHomepage /> : <RedirectToLogin />}
          >
            <Route path="leaderboard" element={<Leaderboard />}></Route>
            <Route path="battles" element={<Battles />}></Route>
            <Route path="/home/battle/:id" element={<Battle />}></Route>
            <Route path="/home" element={<Battles />}></Route>
          </Route>

          <Route path="*" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
