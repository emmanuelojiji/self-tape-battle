import React from "react";
import "./Button.scss";

const Button = ({ text, type, onClick, disabled }) => {
  return (
    <button className={`${type}`} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
