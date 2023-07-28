import React, { useEffect, useState } from "react";
import "./VideoModal.scss";
import Avatar from "../components/Avatar.js";
import Button from "./Button";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore";

const VideoModal = ({ voteCount, selectedVideo, setModalVisible }) => {
  const user = localStorage.getItem("currentUser");

  const currentURL = window.location.href;
  const parts = currentURL.split("/");
  const id = parts.pop();

  const [votes, setVotes] = useState();
  const [name, setName] = useState();
  const [url, setUrl] = useState();

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
        setVotes(votesDocs.docs.length);
      } catch {
        console.log("error");
      }
    };

    const getUser = async () => {
      const docSnapshot = doc(db, "battles", id, "entries", selectedVideo);

      try {
        const entryDocs = await getDoc(docSnapshot);
        setName(entryDocs.data().name);
      } catch {
        console.log("Couldn't get name");
      }
    };

    const getVideo = async () => {
      try {
        const videoLocation = doc(db, "battles", id, "entries", selectedVideo);
        const videoDoc = await getDoc(videoLocation);

        setUrl(videoDoc.data().url);
      } catch {
        console.log("couldn't get video");
      }
    };

    getVotes();
    getUser();
    getVideo();
  }, [id, selectedVideo]); // Add id and selectedVideo as dependencies to avoid infinite loop.

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
      await setDoc(doc(votesCollection, user), {
        name: "Sasha",
        uid: user,
        time: Timestamp.now(),
      });

      setVotes(votesCollection.length); // Increment the vote count locally.

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
            <h3>{name}</h3>
          </div>
          <div className="right">
            <div className="num-of-votes">{votes}</div>
            <Button text="Vote" onClick={() => handleVote()} />
          </div>
        </div>

        <div className="video">
          {url && (
            <video controls width="100%" height="100%">
              <source src={url}></source>
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
