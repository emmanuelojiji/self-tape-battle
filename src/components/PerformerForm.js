import { useState } from "react";
import InputText from "./InputText";
import "./OnboardingForm.scss";

const PerformerForm = () => {
  const [step, setStep] = useState(1);
  return (
    <div class="performer-form">
 
      <h1>Performer</h1>

      {step === 1 && (
        <div className="step-1 step">
          <h2>Hey! What's your name?</h2>
          <InputText placeholder="First Name" />
          <InputText placeholder="Last Name" />
          <button onClick={() => setStep(step + 1)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="step-2 step">
          <h2>Tell us a bit about you..</h2>
          <InputText placeholder="City" />
          <InputText placeholder="Bio" />
          <InputText placeholder="Link" />
         
          <button onClick={() => setStep(step + 1)}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className="step-3 step">
          <h2>Upload your headshot</h2>
          <button>Complete profile</button>
        </div>
      )}
      </div>
 
  );
};

export default PerformerForm;
