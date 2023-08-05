import InputText from "../components/InputText";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.scss";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import logo from "../media/logo.svg";

const LogIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
    navigate("/home/battles");
  };

  return (
    <main className="log-in">
      <div className="left">
        <div className="form-container">
          <img src={logo} className="logo" />
          <h2>Log in</h2>
          <InputText
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputText
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleLogIn()}>Log In</button>
          <Link to="/signup">
            <span>Sign up instead</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LogIn;
