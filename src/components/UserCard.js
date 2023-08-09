import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "./UserCard.scss";

const UserCard = ({ firstName, lastName, role, userId, image}) => {
  return (
    <Link to={`/home/profile/${userId}`}>
      <div className="user-card">
        <Avatar image={image} size="50" borderRadius="10px"/>
        <div>
          <h4>{`${firstName + " " + lastName}`}</h4>
          <p>{role}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
