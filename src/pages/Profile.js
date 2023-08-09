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
import VideoModal from "../components/VideoModal";
import { useParams } from "react-router-dom";
import Avatar from "../components/Avatar";
import { useAuth } from "../AuthContext";

const Profile = () => {
  const [loading, setLoading] = useState(true);

  const { auth, storedUserId } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState();

  /*const currentURL = window.location.href;
  const parts = currentURL.split("/");
  const id = parts.pop();*/

  const { id } = useParams();

  console.log("params:", id);

  const [entries, setEntries] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState();

  const [battleId, setBattleId] = useState();

  const [headshotURL, setHeadshotURL] = useState();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const docSnapshot = await getDoc(doc(db, "users", id));
        const userData = docSnapshot.data();

        setFirstName(userData.first_name);
        setLastName(userData.last_name);
        setCity(userData.city);
        setBio(userData.bio);
        setLink(userData.link);
        setHeadshotURL(userData.headshot);

        setLoading(false);
      } catch {
        console.log("sorry didn't work");
      }
    };

    const getUserEntries = async () => {
      try {
        const entriesRef = collectionGroup(db, "entries");
        const q = query(entriesRef, where("uid", "==", id));
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
  }, [id]);

  return (
    <>
      {modalVisible && (
        <VideoModal
          selectedVideo={selectedVideo}
          battleId={battleId}
          setModalVisible={setModalVisible}
        />
      )}
      <div>
        <div className="profile-container">
          <div className="profile-picture-wrap">
            <Avatar image={headshotURL} size="300" />
          
          </div>
          {loading ? (
            <ProfileInfoSkeleton />
          ) : (
            <div className="profile-info">
              <h2 className="profile-name">
                {firstName} {lastName}
              </h2>
              <p className="bio">{bio}</p>
              <div className="city-bio-wrap">
                <p className="city">{city}</p>
              </div>
              <a href={link} className="link">
                {link}
              </a>
            </div>
          )}
        </div>
        <h3 className="profile-heading">Entries</h3>
        <div className="video-card-container">
          {entries.map((entry) => (
            <VideoCard
              title={entry.battleName}
              uid={entry.uid}
              onClick={() => {
                setModalVisible(true);
                setSelectedVideo(entry.uid);
                setBattleId(entry.battleId);
              }}
            />
          ))}

          {entries.length === 0 && <p>No entries</p>}
        </div>
      </div>
    </>
  );
};

export default Profile;
