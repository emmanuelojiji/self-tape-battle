import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import "./VideoCard.scss";

const VideoCard = ({ onClick, title, uid }) => {
  const [votes, setVotes] = useState(null);

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
    getVotes();
  });

  return (
    <div className="video-card" onClick={onClick}>
      <h1>{title}</h1>
      <div className="num-of-votes">{votes}</div>
    </div>
  );
};

export default VideoCard;
