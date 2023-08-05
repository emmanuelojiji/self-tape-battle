import React from "react";
import "./Homepage.scss";
import logo from "../media/logo-white.svg";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage-banner">
        Smile! 🎥 You're in the test version of Self Tape Battle. If you have a
        referral code, you can begin testing out our features before the app is
        launched. It's still rusty right now, bear with us!
      </div>
      <img src={logo} className="logo" />

      <p>
        Please switch to a desktop, we're currently building the mobile Arena.
      </p>
      <Link to="/signup">
        <button>Let's go</button>
      </Link>

      <a href="http://twitter.com/thinkrstudio" className="company">Thinkr Studio</a>
    </div>
  );
};

export default Homepage;
