import React from "react";
import "./VideoCard.scss";

const VideoCard = ({ onClick, title }) => {
  return (
    <div className="video-card" onClick={onClick}>
      <h1>{title}</h1>
   
    </div>
  );
};

export default VideoCard;
