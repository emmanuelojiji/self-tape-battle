import React from "react";
import "../pages/Profile.scss";

const ProfileInfoSkeleton = () => {
  return (
    <div className="profile-info">
      <div className="name-skeleton skeleton"></div>

      <div className="city-bio-wrap skeleton">
        <div className="city-skeleton skeleton"></div>
        <div className="bio-skeleton skeleton"></div>
      </div>
      <div className="link-skeleton skeleton"></div>
    </div>
  );
};

export default ProfileInfoSkeleton;
