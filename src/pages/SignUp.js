import InputText from "../components/InputText";
import { Link } from "react-router-dom";
import "./SignUp.scss";
import { useState } from "react";

const SignUp = () => {
  const [role, setRole] = useState("performer");

  return (
    <main className="sign-up">
      <div className="left">
        <div className="form-container">
          <h2>Sign up as a {role}</h2>
          <InputText placeholder="Email" />
          <InputText placeholder="Password" />
          <Link to="/login">
            <span>Log in instead</span>
          </Link>
          <span
            onClick={() =>
              role === "performer"
                ? setRole("professional")
                : setRole("performer")
            }
          >
            {role === "performer"
              ? "Sign up as professional"
              : "Sign up as a performer"}
          </span>

          <button
            onClick={() =>
              role === "performer"
                ? console.log("Yay! You signed up as a performer")
                : console.log("Ooo! You signed up as a professional")
            }
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="right"></div>
    </main>
  );
};

export default SignUp;
