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
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [codeInput, setCodeInput] = useState("");

  const [code, setCode] = useState("1234");
  const [codeError, setCodeError] = useState("");

  let formHasError;

  const navigate = useNavigate();

  const { user, storedUserId } = useAuth();

  const performerSignUp = async () => {
    setEmailError("");
    setPasswordError("");
    setCodeError("");

    if (email.length === 0) {
      setEmailError("Email cannot be empty");
      formHasError = true;
    }

    if (email.length > 0 && !email.includes("@") && !email.includes(".")) {
      setEmailError("Please enter a valid email");
      formHasError = true;
    }

    if (codeInput != code) {
      setCodeError("We can't let you into the arena, that code is invalid!");
      formHasError = true;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 letters");
    }

    if (!formHasError) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", auth.currentUser.uid), {
          uid: auth.currentUser.uid,
          email: email,
          role: role,
          coins: 5,
          ranking: "cameo_star",
        });

        //await signInWithEmailAndPassword(auth, email, password);

        navigate("/home");
      } catch (error) {
        console.log(error.message);
      }
    }
    return null;
  };

  return (
    <main className="sign-up">
      <div className="left">
        <div className="form-container">
          <img src={logo} className="logo" />
          <h2>Sign up as a {role}</h2>

          {role != "professional" && (
            <>
              <form>
                <p>{codeError}</p>
                <InputText
                  type="text"
                  placeholder="Referral code"
                  onChange={(e) => setCodeInput(e.target.value)}
                  border={codeError && "solid 1px red"}
                />
                <p>{emailError}</p>
                <InputText
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  border={emailError && "solid 1px red"}
                />
                <p>{passwordError}</p>
                <InputText
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  border={passwordError && "solid 1px red"}
                />
              </form>
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
