import InputText from "../components/InputText";
import { Link } from "react-router-dom";
import "./SignUp.scss";
import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import logo from "../media/logo.svg";
import { useAuth } from "../AuthContext";

const SignUp = () => {
  const [role, setRole] = useState("performer");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [codeInput, setCodeInput] = useState("");

  const [code, setCode] = useState("kenneth");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { user, storedUserId } = useAuth();

  const performerSignUp = async () => {
    if (code === codeInput) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          email: email,
          role: role,
          coins: 5,
          ranking: "Cameo Star",
        });

        //await signInWithEmailAndPassword(auth, email, password);

        navigate("/home");
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setError("Invalid referral code");
    }
  };

  return (
    <main className="sign-up">
      <div className="left">
        <div className="form-container">
          <img src={logo} className="logo" />
          <h2>Sign up as a {role}</h2>

          {role != "professional" && (
            <>
              <p>{error}</p>
              <InputText
                type="text"
                placeholder="Referral code"
                onChange={(e) => setCodeInput(e.target.value)}
              />
              <InputText
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputText
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          {role != "professional" && (
            <button
              onClick={() =>
                role === "performer"
                  ? performerSignUp()
                  : console.log("professional signup")
              }
            >
              Sign up
            </button>
          )}

          <Link to="/login">
            <span>Log in instead</span>
          </Link>
          {/*<span
            onClick={() =>
              role === "performer"
                ? setRole("professional")
                : setRole("performer")
            }
          >
            {role === "performer"
              ? "Sign up as professional"
              : "Sign up as a performer"}
          </span>*/}
        </div>
      </div>
    </main>
  );
};

export default SignUp;
