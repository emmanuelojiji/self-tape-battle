import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { redirect } from "react-router-dom";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { useNavigate } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import AppHomepage from "./pages/AppHomepage";
import RedirectToLogin from "./components/RedirectToLogin";

function App() {
  const signedIn = false;

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" Component={LogIn}></Route>
          <Route path="/signup" Component={SignUp}></Route>
          <Route path="/onboarding" Component={Onboarding}></Route>
          <Route path="*" Component={SignUp} />
          <Route
            path="/battles"
            Component={signedIn ? AppHomepage : RedirectToLogin}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
