import React, { useEffect, useState } from "react";
import "./VideoModal.scss";
import Avatar from "../components/Avatar.js";
import Button from "./Button";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";

const VideoModal = ({ voteCount, selectedVideo, setModalVisible }) => {
  const user = auth.currentUser;

  const currentURL = window.location.href;
  const parts = currentURL.split("/");
  const id = parts.pop();

  const [votes, setVotes] = useState();

  useEffect(() => {
    const votesCollection = collection(
      db,
      "battles",
      id,
      "entries",
      selectedVideo,
      "votes"
    );

    const getVotes = async () => {
      try {
        const votesDocs = await getDocs(votesCollection);
        setVotes(votesDocs.docs.length)
      } catch {
        console.log("error");
      }
    };

    getVotes();
  });

  const handleVote = async () => {
    try {
      const votesCollection = collection(
        db,
        "battles",
        id,
        "entries",
        selectedVideo,
        "votes"
      );
      await setDoc(doc(votesCollection, user.uid), {
        name: "Sasha",
        uid: user.uid,
        time: Timestamp.now(),
      });

      setVotes(votesCollection.length);

      console.log(votes);
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="video-modal" onClick={() => setModalVisible(false)}>
      <div className="modal">
        <div className="modal-header">
          <div className="left">
            <Avatar size="35" />
            <h3>Sasha Coleman</h3>
          </div>
          <div className="right">
            <div className="num-of-votes">{votes}</div>
            <Button text="Vote" onClick={() => handleVote()} />
          </div>
        </div>

        <div className="video"></div>
      </div>
    </div>
  );
};

export default VideoModal;
