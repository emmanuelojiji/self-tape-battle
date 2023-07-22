import React, { useReducer } from "react";
import Button from "./Button";
import "./UploadModal.scss";
import { auth, db } from "../firebaseConfig";
import { useParams } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";



const UploadModal = ({ uploadModalVisible, setUploadModalVisible }) => {
  const currentURL = window.location.href;
  const parts = currentURL.split("/");
  const id = parts.pop();

  const user = auth.currentUser;

  const uploadTape = async () => {
    try {
      const entriesCollection = collection(db, "battles", id, "entries");

      await setDoc(doc(entriesCollection, user.uid), {
        name: user.displayName,
        uid: user.uid,
      });

     
      setUploadModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div
      className={`upload-modal ${uploadModalVisible && "modal-open"}`}
      onClick={() => setUploadModalVisible(false)}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Upload Tape</h2>
        <div className="upload-area"></div>
        <Button text="Upload" onClick={() => uploadTape()} />
      </div>
    </div>
  );
};

export default UploadModal;
