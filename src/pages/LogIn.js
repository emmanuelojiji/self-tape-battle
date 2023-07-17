import InputText from "../components/InputText";
import { Link } from "react-router-dom";
import "./LogIn.scss";

const LogIn = () => {
  return (
    <main className="log-in">
      <div className="left">
        <div className="form-container">
          <h2>Log in</h2>
          <InputText placeholder="Email" />
          <InputText placeholder="Password" />
          <Link to="/signup">
            {" "}
            <span>Sign up instead</span>
          </Link>
        </div>
      </div>
      <div className="right"></div>
    </main>
  );
};

export default LogIn;
