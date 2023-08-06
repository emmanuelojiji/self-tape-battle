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
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import VideoCard from "../components/VideoCard";
import VideoModal from "../components/VideoModal";
import PraiseModal from "../components/PraiseModal";
import UploadModal from "../components/UploadModal";
import { useAuth } from "../AuthContext";

const Battle = () => {
  const { id } = useParams();

  const [modalVisible, setModalVisible] = useState(false);

  const [uploadModalVisible, setUploadModalVisible] = useState(false);

  const [praiseModalVisible, setPraiseModalVisible] = useState(true);
  const [praiseModalType, setPraiseModalType] = useState("");

  const [battle, setBattle] = useState("");

  const [entries, setEntries] = useState([]);

  const [selectedVideo, setSelectedVideo] = useState();

  const [battleId, setBattleId] = useState();

  const [currentUserEntry, setCurrentUserEntry] = useState();

  const { storedUserId } = useAuth();

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

      onSnapshot(entriesQuery, (snapshot) => {
        if (snapshot.empty) {
          setEntries(entry);
        } else {
          const updatedEntry = snapshot.docs.map((doc) => doc.data());
          setEntries(updatedEntry);
        }
      });
    } catch (error) {
      console.log("Sorry:" + error.message);
    }
  };

  const getCurrentUserEntry = async () => {
    try {
      const currentUserEntry = doc(db, "battles", id, "entries", storedUserId);
      const docSnapshot = await getDoc(currentUserEntry);

      onSnapshot(currentUserEntry, async (snapshot) => {
        if (snapshot) {
          const newDocSnapshot = await getDoc(currentUserEntry);
          setCurrentUserEntry(newDocSnapshot.data());
        } else {
          setCurrentUserEntry(docSnapshot.data());
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {uploadModalVisible && (
        <UploadModal
          setUploadModalVisible={setUploadModalVisible}
          setPraiseModalVisible={setPraiseModalVisible}
          setPraiseModalType={setPraiseModalType}
        />
      )}
      {praiseModalVisible && (
        <PraiseModal
          setPraiseModalVisible={setPraiseModalVisible}
          type="upload"
        />
      )}
      {modalVisible && (
        <VideoModal
          selectedVideo={selectedVideo}
          setModalVisible={setModalVisible}
          setPraiseModalVisible={setPraiseModalVisible}
          setPraiseModalType={setPraiseModalType}
          battleId={battleId}
        />
      )}
      <div className="battle-header">
        <div>{<h1>{battle.name}</h1>}</div>

        {battle.active && !currentUserEntry && (
          <Button
            type="filled"
            text="Upload tape"
            onClick={() => {
              setUploadModalVisible(true);
            }}
          />
        )}
      </div>

      <div className="entry-card-container">
        {currentUserEntry && (
          <VideoCard
            title={currentUserEntry.name}
            uid={currentUserEntry.uid}
            onClick={() => {
              setSelectedVideo(currentUserEntry.uid);
              setBattleId(currentUserEntry.battleId);
              setModalVisible(true);
              console.log(selectedVideo);
            }}
          />
        )}
        {entries.map((entry) => {
          return (
            <VideoCard
              key={entry.name}
              title={entry.name}
              selectedVideo={selectedVideo}
              uid={entry.uid}
              onClick={() => {
                setSelectedVideo(entry.uid);
                setBattleId(entry.battleId);
                setModalVisible(true);
                console.log(selectedVideo);
              }}
              battleId={battleId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Battle;
