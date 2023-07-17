import InputText from "../components/InputText";
import { Link } from "react-router-dom";
import "./Onboarding.scss";
import PerformerForm from "../components/PerformerForm";
import ProfessionalForm from "../components/ProfessionalForm";

const Onboarding = () => {
  const type = "professional";
  return (
    <main className="onboarding">
      {type === "performer" && <PerformerForm />}
      {type === "professional" && <ProfessionalForm />}
    </main>
  );
};

export default Onboarding;
