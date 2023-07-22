import React from "react";
import "./VideoModal.scss";
import Avatar from "../components/Avatar.js";
import Button from "./Button";
import { auth, db } from "../firebaseConfig";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

const VideoModal = ({ voteCount, selectedVideo }) => {
  const user = auth.currentUser;

  const currentURL = window.location.href;
  const parts = currentURL.split("/");
  const id = parts.pop();

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
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="video-modal">
      <div className="modal">
        <div className="modal-header">
          <div className="left">
            <Avatar size="35" />
            <h3>Sasha Coleman</h3>
          </div>
          <div className="right">
            <div className="num-of-votes">0</div>
            <Button text="Vote" onClick={() => handleVote()} />
          </div>
        </div>

        <div className="video"></div>
      </div>
    </div>
  );
};

export default VideoModal;
