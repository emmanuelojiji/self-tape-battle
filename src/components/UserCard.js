import React from "react";
import "./UserCard.scss";

const UserCard = ({ firstName, lastName, role }) => {
  return (
    <div className="user-card">
      <div class="avatar"></div>
      <div>
        <h3>
          {firstName} {lastName}
        </h3>
        <p>{role}</p>
      </div>
    </div>
  );
};

export default UserCard;
