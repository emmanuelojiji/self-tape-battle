import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.scss";

const UserCard = ({ firstName, lastName, role, userId }) => {
  return (
    <Link to={`/home/profile/${userId}`}>
      <div className="user-card">
        <div class="avatar"></div>
        <div>
          <h3>
            {firstName} {lastName}
          </h3>
          <p>{role}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
