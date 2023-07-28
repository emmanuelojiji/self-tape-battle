import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Battle.scss";

import Button from "../components/Button";

import {
  collection,
  getDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import VideoCard from "../components/VideoCard";
import VideoModal from "../components/VideoModal";

const Battle = ({ setUploadModalVisible }) => {
  const { id } = useParams();

  const [modalVisible, setModalVisible] = useState(false);

  const [battle, setBattle] = useState("");

  const [entries, setEntries] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState();

  const [currentUserEntry, setCurrentUserEntry] = useState();

  useEffect(() => {
    getBattle();
    getEntries();
    getCurrentUserEntry();
  }, []);

  const getBattle = async () => {
    try {
      const battlesCollectionRef = collection(db, "battles");
      const battleDoc = await getDoc(doc(battlesCollectionRef, id));

      setBattle(battleDoc.data());
    } catch (error) {
      console.log(error);
    }
  };

  const getEntries = async () => {
    try {
      const entriesCollectionRef = collection(db, "battles", id, "entries");

      const entriesQuery = query(entriesCollectionRef, orderBy("time", "asc"));
      const entriesDocs = await getDocs(entriesQuery);

      const entry = entriesDocs.docs.map((doc) => doc.data());

      setEntries(entry);
    } catch (error) {
      console.log("Sorry:" + error.message);
    }
  };

  const getCurrentUserEntry = async () => {
    try {
      const currentUserEntry = doc(
        db,
        "battles",
        id,
        "entries",
        localStorage.getItem("currentUser")
      );
      const docSnapshot = await getDoc(currentUserEntry);
      setCurrentUserEntry(docSnapshot.data());
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {modalVisible && (
        <VideoModal
          selectedVideo={selectedVideo}
          setModalVisible={setModalVisible}
        />
      )}
      <div className="battle-header">
        <div>{<h1>{battle.name}</h1>}</div>

        <Button
          text="Upload tape"
          onClick={() => {
            setUploadModalVisible(true);
          }}
        />
      </div>

      <div className="entry-card-container">
        {currentUserEntry && (
          <VideoCard
            title={currentUserEntry.name}
            uid={currentUserEntry.uid}
            onClick={() => {
              setSelectedVideo(currentUserEntry.uid);
              setModalVisible(true);
              console.log(selectedVideo);
            }}
          />
        )}
        {entries.map((entry) => (
          <VideoCard
            key={entry.name}
            title={entry.name}
            selectedVideo={selectedVideo}
            uid={entry.uid}
            onClick={() => {
              setSelectedVideo(entry.uid);
              setModalVisible(true);
              console.log(selectedVideo);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Battle;
