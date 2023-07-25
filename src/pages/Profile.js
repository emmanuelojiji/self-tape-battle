import React, { useEffect } from "react";
import "./Profile.scss";
import { auth, db } from "../firebaseConfig";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  collectionGroup,
  where,
} from "firebase/firestore";
import { useState } from "react";
import Headshot from "../media/headshot.jpeg";
import VideoCard from "../components/VideoCard";
import ProfileInfoSkeleton from "../components/ProfileInfoSkeleton";

const Profile = () => {
  const user = auth.currentUser;

  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState();

  const currentURL = window.location.href;
  const parts = currentURL.split("/");
  const id = parts.pop();

  const [entries, setEntries] = useState([]);

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

        setLoading(false);
      } catch {
        console.log("sorry didn't work");
      }
    };

    const getUserEntries = async () => {
      try {
        const entriesRef = collectionGroup(db, "entries");
        const q = query(entriesRef, where("uid", "==", user.uid));
        const entriesDocs = await getDocs(q);

        console.log(entriesDocs);

        const data = entriesDocs.docs.map((doc) => doc.data());
        setEntries(data);
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUserInfo();
    getUserEntries();

    console.log(user);
  });

  return (
    <div>
      <div className="profile-container">
        <div
          className="profile-picture"
          style={{ backgroundImage: `url(${Headshot})` }}
        ></div>
        {loading ? (
          <ProfileInfoSkeleton />
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
          <VideoCard title={entry.battleName} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
