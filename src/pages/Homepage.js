import React from "react";
import "./Homepage.scss";
import logo from "../media/logo-white.svg";
const Homepage = () => {
  return (
    <div className="homepage">
      <img src={logo} className="logo" />

      <p>
        Smile! 📸 You're in the test version of Self Tape Battle. If you
        have a referral code, you can begin testing out our features before we launch.
      </p>
      <button>Let's go</button>

      <p className="company">Thinkr Studio</p>
    </div>
  );
};

export default Homepage;
