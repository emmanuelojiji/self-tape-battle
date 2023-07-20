import InputText from "../components/InputText";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.scss";
import { auth, db } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const LogIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch {
      console.log("couldn't log in sorry");
    }
  };

  return (
    <main className="log-in">
      <div className="left">
        <div className="form-container">
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
      <div className="right"></div>
    </main>
  );
};

export default LogIn;
