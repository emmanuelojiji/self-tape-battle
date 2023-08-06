import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "./InputText";
import "./PerformerForm.scss";
import "./OnboardingForm.scss";
import { auth, db, storage } from "../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "../AuthContext";

const PerformerForm = ({ setOnboardingComplete }) => {
  const { user, storedUserId } = useAuth();

  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const [city, setCity] = useState();
  const [bio, setBio] = useState();
  const [link, setLink] = useState();

  const navigate = useNavigate();

  const fileInputRef = useRef();

  const [userFile, setUserFile] = useState();
  const imagePreview = userFile && URL.createObjectURL(userFile);

  const handleInfo = async () => {
    try {
      await updateDoc(doc(db, "users", storedUserId), {
        first_name: firstName,
        last_name: lastName,
        city: city,
        bio: bio,
        link: link,
        onboarding_complete: true,
      });

      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });

      const uploadToFirestore = async (url) => {
        const usersCollection = doc(db, "users", storedUserId);
        try {
          await updateDoc(usersCollection, {
            headshot: url,
          });
        } catch {}
        window.location.reload();
      };

      const uploadToStorage = () => {
        const fileName = storedUserId;
        const headshotFileRef = ref(storage, `headshots/${fileName}`);

        uploadBytes(headshotFileRef, userFile).then((snapshot) => {
          console.log("uploaded!");

          getDownloadURL(headshotFileRef).then((url) => {
            uploadToFirestore(url);
          });
        });
      };

      uploadToStorage();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(userFile);
  });

  return (
    <div className="performer-form">
      <h1>Performer</h1>

      {step === 1 && (
        <div className="step-1 step">
          <h2>Hey! What's your name?</h2>
          <InputText
            placeholder="First Name"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputText
            placeholder="Last Name"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <button onClick={() => setStep(step + 1)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="step-2 step">
          <h2>Tell us a bit about you..</h2>
          <InputText
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
          />
          <InputText
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
          />
          <InputText
            placeholder="Link"
            onChange={(e) => setLink(e.target.value)}
          />

          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className="step-3 step">
          <h2>Upload your headshot</h2>
          <div
            className="upload-image-circle"
            onClick={() => fileInputRef.current.click()}
            style={{ backgroundImage: `url(${imagePreview})` }}
          ></div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              setUserFile(e.target.files[0]);
            }}
          ></input>
          <button onClick={() => handleInfo()}>Complete profile</button>
          <button onClick={() => handleInfo()}>Skip for now</button>
        </div>
      )}
    </div>
  );
};

export default PerformerForm;
