import React from "react";
import "./PraiseModal.scss";

const PraiseModal = ({ title, setPraiseModalVisible }) => {
  return (
    <div
      className="praise-modal-container"
      onClick={() => setPraiseModalVisible(false)}
    >
      <div className="praise-modal" onClick={(e) => e.stopPropagation}>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default PraiseModal;
