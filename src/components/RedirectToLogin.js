import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RedirectToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  });

  return (
    <>
      <h1>hey</h1>
    </>
  );
};

export default RedirectToLogin;
