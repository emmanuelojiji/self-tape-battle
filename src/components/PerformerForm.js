import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputText from "./InputText";
import "./OnboardingForm.scss";
import { auth, db } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const PerformerForm = () => {
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

  const [city, setCity] = useState();
  const [bio, setBio] = useState();
  const [link, setLink] = useState();

  const navigate = useNavigate();

  const handleInfo = async () => {
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
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

      navigate("/home/battles");
    } catch {
      console.log("Couldn't add details, sorry!");
    }
  };

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

          <button onClick={() => handleInfo()}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className="step-3 step">
          <h2>Upload your headshot</h2>
          <button>Complete profile</button>
          <button onClick={() => handleInfo()}>Skip for now</button>
        </div>
      )}
    </div>
  );
};

export default PerformerForm;
