import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import "./UserCard.scss";
import Tick from "../media/icon-tick.svg";

const UserCard = ({
  firstName,
  lastName,
  role,
  userId,
  image,
  imageSize,
  description,
}) => {
  return (
    <Link to={`/home/profile/${userId}`}>
      <div className="user-card">
        <Avatar image={image} size={imageSize} borderRadius="10px" />
        <div>
          <h3>{`${firstName + " " + lastName}`}</h3>
          {role === "admin" && <img src={Tick} />}
          <p>{role}</p>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
