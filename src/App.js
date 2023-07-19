import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useNavigate } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import AppHomepage from "./pages/AppHomepage";
import RedirectToLogin from "./components/RedirectToLogin";
import Leaderboard from "./pages/Leaderboard";
import Battles from "./pages/Battles";
import Battle from "./pages/Battle";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const signedIn = true;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/onboarding" element={<Onboarding />}></Route>

          <Route
            path="/home"
            element={signedIn ? <AppHomepage /> : <RedirectToLogin />}
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
