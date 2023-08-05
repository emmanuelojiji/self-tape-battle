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
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "../AuthContext";

const VideoModal = ({
  voteCount,
  selectedVideo,
  setModalVisible,
  setPraiseModalVisible,
  setPraiseModalType,
  battleId,
}) => {
  const user = useAuth();

  const [votes, setVotes] = useState();
  const [name, setName] = useState();
  const [headshot, setHeadshot] = useState();
  const [url, setUrl] = useState();

  const { storedUserId } = useAuth();

  useEffect(() => {
    const votesCollection = collection(
      db,
      "battles",
      battleId,
      "entries",
      selectedVideo,
      "votes"
    );

    console.log("selected:", selectedVideo);

    const getVotes = async () => {
      try {
        const votesDocs = await getDocs(votesCollection);
        setVotes(votesDocs.docs.length);
      } catch {
        console.log("error");
      }
    };

    const getName = async () => {
      const docSnapshot = doc(
        db,
        "battles",
        battleId,
        "entries",
        selectedVideo
      );


      try {
        const entryDocs = await getDoc(docSnapshot);
        setName(entryDocs.data().name);
        setHeadshot(entryDocs.data().headshot);
      } catch {
        console.log("Couldn't get name ");
      }
    };

    const getVideo = async () => {
      try {
        const videoLocation = doc(
          db,
          "battles",
          battleId,
          "entries",
          selectedVideo
        );
        const videoDoc = await getDoc(videoLocation);

        setUrl(videoDoc.data().url);
      } catch {
        console.log("couldn't get video");
      }
    };

    const getHeadshot = async () => {
      try {
        const userRef = doc(db, "users", selectedVideo);
        const userHeadshot = await getDoc(userRef);
        setHeadshot(userHeadshot.data().headshot)
        console.log(userHeadshot.data().headshot);
      } catch (error) {
        console.log("couldn't get headshot");
      }
    };

    getVotes();
    getName();
    getHeadshot();
    getVideo();
    voteCheck();
  }, [battleId, selectedVideo]); // Add battleId and selectedVideo as dependencies to avoid infinite loop.

  const handleVote = async () => {
    try {
      const votesCollection = collection(
        db,
        "battles",
        battleId,
        "entries",
        selectedVideo,
        "votes"
      );
      await setDoc(doc(votesCollection, storedUserId), {
        name: "Sasha",
        uid: storedUserId,
        time: Timestamp.now(),
      });

      setVotes(votesCollection.length);

      setModalVisible(false);
      setPraiseModalVisible(true);
      setPraiseModalType("vote");

      console.log(votes);
    } catch {
      console.log("error");
    }
  };

  const voteCheck = async () => {
    const votesCollection = collection(
      db,
      "battles",
      battleId,
      "entries",
      selectedVideo,
      "votes"
    );
    const votesQuery = query(votesCollection, where("uid", "==", storedUserId));

    try {
      onSnapshot(votesQuery, (snapshot) => {
        // This callback will be triggered whenever the document changes
        // Check if the document still exists in the snapshot
        if (!snapshot.empty) {
          setAlreadyVoted(true);
        } else {
          setAlreadyVoted(false);
        }
      });
    } catch {
      console.log("couldn't do vote check");
    }
  };

  const [alreadyVoted, setAlreadyVoted] = useState(null);

  return (
    <div className="video-modal" onClick={() => setModalVisible(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="left">
            <Avatar size="35" image={headshot} />
            <h3>{selectedVideo === storedUserId ? "You" : name}</h3>
          </div>
          <div className="right">
            <div className="num-of-votes">{votes}</div>
            {selectedVideo != storedUserId && (
              <Button
                text={alreadyVoted ? "Voted!" : "Vote"}
                disabled={alreadyVoted && true}
                onClick={() => handleVote()}
              />
            )}
          </div>
        </div>

        <div className="video">
          {url && (
            <video
              controls
              width="100%"
              height="100%"
              disablePictureInPicture
              controlsList="nodownload"
            >
              <source src={url}></source>
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
