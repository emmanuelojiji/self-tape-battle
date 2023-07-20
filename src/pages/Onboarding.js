import InputText from "../components/InputText";
import { Link, useNavigate } from "react-router-dom";
import "./Onboarding.scss";
import PerformerForm from "../components/PerformerForm";
import ProfessionalForm from "../components/ProfessionalForm";
import { useEffect } from "react";

const Onboarding = ({ onboardingComplete }) => {
  const type = "performer";

 

  return (
    <main className="onboarding">
      {type === "performer" && <PerformerForm />}
      {type === "professional" && <ProfessionalForm />}
    </main>
  );
};

export default Onboarding;
