import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Battle.scss";

import Button from "../components/Button";

import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import VideoCard from "../components/VideoCard";
import VideoModal from "../components/VideoModal";

const Battle = ({ setUploadModalVisible }) => {
  const { id } = useParams();

  const user = auth.currentUser;

  const [modalVisible, setModalVisible] = useState(false);

  const [battle, setBattle] = useState("");

  const [entries, setEntries] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState();

  useEffect(() => {
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

        const entriesDocs = await getDocs(entriesCollectionRef);

        const entry = entriesDocs.docs.map((doc) => doc.data());

        console.log(entry.length);

        setEntries(entry);
      } catch {
        console.log("sorry");
      }
    };

    const getVotes = async () => {
      try {
        const votesCollection = collection(db, "battles", id);
      } catch {}
    };

    getBattle();
    getEntries();
  }, []);

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

      <div className="winner-contaner">
        <h3>Current Winner:</h3>
      </div>

      <div className="entry-card-container">
        {entries.map((entry) => (
          <VideoCard
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
