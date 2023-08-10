import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "./UserCard.scss";

const UserCard = ({ firstName, lastName, role, userId, image}) => {
  return (
    <Link to={`/home/profile/${userId}`}>
      <div className="user-card">
        <Avatar image={image} size="100" borderRadius="10px"/>
        <div>
          <h3>{`${firstName + " " + lastName}`}</h3>
          <p>{role}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
