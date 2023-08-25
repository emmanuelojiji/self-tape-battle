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

const PerformerForm = ({
  setOnboardingComplete,
  setIsFirstLogIn,
  setWelcomeModalVisible,
}) => {
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

  const [error, setError] = useState("")

  const handleInfo = async () => {
    if (userFile) {
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
          setOnboardingComplete(true);
          setWelcomeModalVisible(true);
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
    }
    setError("Please upload a headshot.")
  };

  useEffect(() => {
    console.log(userFile);
  });

  return (
    <div className="performer-form">
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
          >
            <span className="upload-cross">+</span>
          </div>
          {error && <p className="error">{error}</p>}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              setUserFile(e.target.files[0]);
              setError("")
            }}
          ></input>
          <button onClick={() => handleInfo()}>Complete profile</button>
        </div>
      )}
    </div>
  );
};

export default PerformerForm;
