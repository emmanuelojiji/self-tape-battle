import React, { useEffect } from "react";
import "./Profile.scss";
import { auth, db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Headshot from "../media/headshot.jpeg";

const Profile = () => {
  const user = auth.currentUser;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const docSnapshot = await getDoc(doc(db, "users", user.uid));
        const userData = docSnapshot.data();

        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setCity(userData.city);
        setBio(userData.bio);
        setLink(userData.link);
      } catch {
        console.log("sorry didn't work");
      }
    };

    getUserInfo();
  });

  return (
    <div>
      <div className="profile-container">
        <div
          className="profile-picture"
          style={{ backgroundImage: `url(${Headshot})` }}
        ></div>
        <div className="profile-info">
          <h2 className="profile-name">
            {firstName} {lastName}
          </h2>
          <p>{bio}</p>
          <p>{city}</p>

          <p>{link}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
