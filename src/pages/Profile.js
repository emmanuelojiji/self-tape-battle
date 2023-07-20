import React, { useEffect } from "react";
import "./Profile.scss";
import { auth, db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useState } from "react";

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
      <h1>{firstName}</h1>
      <h1>{lastName}</h1>
      <h1>{city}</h1>
      <h1>{bio}</h1>
      <h1>{link}</h1>
    </div>
  );
};

export default Profile;
