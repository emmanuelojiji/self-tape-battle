import InputText from "../components/InputText";
import { Link, useNavigate } from "react-router-dom";
import "./LogIn.scss";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import logo from "../media/logo.svg";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogIn = async () => {
    let formHasError;

    setEmailError("")
    setPasswordError("")

    if (email.trim().length === 0) {
      formHasError = true;
      setEmailError("Email cannot be empty");
    }

    if (password.trim().length === 0) {
      formHasError = true;
      setPasswordError("Password cannot be empty");
    }

    if (!formHasError) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/home/battles");
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          setError("This user cannot be found");
        }
      }
    }
  };

  return (
    <main className="log-in">
      <div className="left">
        <div className="form-container">
          <img src={logo} className="logo" />

          <h2>Log in</h2>
          <p>{error && error}</p>

          <p>{emailError}</p>
          <InputText
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            border={emailError && "solid 1px red"}
          />
          <p>{passwordError}</p>
          <InputText
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            border={passwordError && "solid 1px red"}
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
