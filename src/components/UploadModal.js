import React, { useEffect, useReducer, useRef, useState } from "react";
import Button from "./Button";
import "./UploadModal.scss";
import { auth, db, storage } from "../firebaseConfig";
import { collection, doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import PraiseModal from "./PraiseModal";

const UploadModal = ({
  setUploadModalVisible,
  setPraiseModalVisible,
  setPraiseModalType,
}) => {
  const currentURL = window.location.href;
  const parts = currentURL.split("/");
  const id = parts.pop();

  const user = localStorage.getItem("currentUser");

  const [loading, setLoading] = useState(false);

  const uploadToFirestore = async (url) => {
    try {
      const entriesCollection = collection(db, "battles", id, "entries");

      const battlesCollection = collection(db, "battles");
      const battlesDoc = await getDoc(doc(battlesCollection, id));

      const name = battlesDoc.data().name;

      await setDoc(doc(entriesCollection, user), {
        name: auth.currentUser.displayName,
        uid: user,
        battleName: name,
        battleId: id,
        time: Timestamp.now(),
        url: url,
      });

      setUploadModalVisible(false);
      setFile(null);
      setPraiseModalType("upload");
      setPraiseModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const [file, setFile] = useState();
  const fileInputRef = useRef(null);

  const uploadToStorage = () => {
    const fileName = `${user}-${file.name}`;
    const entryFileRef = ref(storage, `${id}/${fileName}`);

    uploadBytes(entryFileRef, file).then((snapshot) => {
      console.log("uploaded!");

      getDownloadURL(entryFileRef).then((url) => {
        console.log("Link is" + url);
        uploadToFirestore(url);
      });
    });
  };

  return (
    <div className="upload-modal" onClick={() => setUploadModalVisible(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Upload Tape</h2>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(file);
          }}
        ></input>
        {loading ? (
          <h3>Uploading..</h3>
        ) : (
          <div className="upload-area">
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p onClick={() => fileInputRef.current.click()}>
                Click to upload
              </p>
            )}
          </div>
        )}

        <Button
          text="Upload"
          onClick={() => {
            setLoading(true);
            uploadToStorage();
          }}
          disabled={!file}
        />
      </div>
    </div>
  );
};

export default UploadModal;
