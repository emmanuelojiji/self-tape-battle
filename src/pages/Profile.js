import React, { useEffect } from "react";
import "./Profile.scss";
import { auth, db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Headshot from "../media/headshot.jpeg";
import VideoCard from "../components/VideoCard";

const Profile = () => {
  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);

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

        setLoading(false)
      } catch {
        console.log("sorry didn't work");
      }
    };

    getUserInfo();
  });

  const entries = [
    { name: "Macbeth", time: "3 days ago" },
    { name: "Macbeth", time: "3 days ago" },
    { name: "Macbeth", time: "3 days ago" },
    { name: "Macbeth", time: "3 days ago" },
  ];

  return (
    <div>
      <div className="profile-container">
        <div
          className="profile-picture"
          style={{ backgroundImage: `url(${Headshot})` }}
        ></div>
        {loading ? (
          <div className="profile-info">
            <div class="name-skeleton skeleton"></div>

            <div class="city-bio-wrap skeleton">
              <div class="city-skeleton skeleton"></div>
              <div class="bio-skeleton skeleton"></div>
            </div>
            <div class="link-skeleton skeleton"></div>
          </div>
        ) : (
          <div className="profile-info">
            <h2 className="profile-name">
              {firstName} {lastName}
            </h2>

            <div class="city-bio-wrap">
              <p className="city">{city}</p>
              <p className="bio">{bio}</p>
            </div>
            <a href={link} className="link">
              {link}
            </a>
          </div>
        )}
      </div>
      <h2 className="profile-heading">Entries</h2>
      <div className="video-card-container">
        {entries.map((entry) => (
          <VideoCard />
        ))}
      </div>
    </div>
  );
};

export default Profile;
