import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import "./VideoCard.scss";

const VideoCard = ({ onClick, title, uid, image }) => {
  const [votes, setVotes] = useState(null);

  const [headshot, setHeadshot] = useState();

  useEffect(() => {
    const currentURL = window.location.href;
    const parts = currentURL.split("/");
    const id = parts.pop();
    const getVotes = async () => {
      try {
        const votesCollection = collection(
          db,
          "battles",
          id,
          "entries",
          uid,
          "votes"
        );

        const votesDocs = await getDocs(votesCollection);

        setVotes(votesDocs.docs.length);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getHeadshot = async () => {
      const userDocRef = doc(db, "users", uid);

      try {
        const userDoc = await getDoc(userDocRef);
        setHeadshot(userDoc.data().headshot);
      } catch {
        console.log("couldn't get headshot");
      }
    };
    getVotes();
    getHeadshot();
  });

  return (
    <div
      className="video-card"
      onClick={onClick}
      style={{ backgroundImage: `url(${headshot})` }}
    >
      <h1>{title}</h1>
      <div className="num-of-votes">{votes}</div>
    </div>
  );
};

export default VideoCard;
