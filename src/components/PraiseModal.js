import React from "react";
import "./PraiseModal.scss";
import ConfettiExplosion from "react-confetti-explosion";

const PraiseModal = ({ title, setPraiseModalVisible, type }) => {
  return (
    <>
      <div
        className="praise-modal-container"
        onClick={() => setPraiseModalVisible(false)}
      >
        <div className="praise-modal" onClick={(e) => e.stopPropagation}>
          <ConfettiExplosion />
          <h2>
            {type === "vote"
              ? "Thanks for voting!"
              : type === "upload"
              ? "You've entered the battle arena!"
              : type === "welcome"
              ? "Welcome to self tape battle"
              : "null"}
          </h2>
          <button>Let's go!</button>
        </div>
      </div>
    </>
  );
};

export default PraiseModal;
