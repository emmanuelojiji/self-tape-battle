import React from "react";
import "./VideoCard.scss";

const VideoCard = ({ onClick }) => {
  return (
    <div className="video-card" onClick={onClick}>
      <h1>Video</h1>
   
    </div>
  );
};

export default VideoCard;
