import { useState } from "react";
import InputText from "./InputText";
import "./OnboardingForm.scss";

const ProfessionalForm = () => {
  const [step, setStep] = useState(1);
  return (
    <div className="performer-form">
      <h1>Professional</h1>

      {step === 1 && (
        <div className="step-1">
          <h2>Hey! What's your name?</h2>
          <InputText placeholder="First Name" />
          <InputText placeholder="Last Name" />
          <button onClick={() => setStep(step + 1)}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className="step-2">
          <h2>What company do you work for?</h2>
          <InputText placeholder="Company" />
          <InputText placeholder="Link" />

          <button onClick={() => setStep(step + 1)}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className="step-3">
          <h2>Upload your company's logo</h2>
          <button>Complete profile</button>
        </div>
      )}
    </div>
  );
};

export default ProfessionalForm;
