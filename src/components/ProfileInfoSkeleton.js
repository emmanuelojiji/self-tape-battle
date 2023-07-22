import React from 'react';
import "../pages/Profile.scss"

const ProfileInfoSkeleton = () => {
    return (
        <div className="profile-info">
            <div class="name-skeleton skeleton"></div>

            <div class="city-bio-wrap skeleton">
              <div class="city-skeleton skeleton"></div>
              <div class="bio-skeleton skeleton"></div>
            </div>
            <div class="link-skeleton skeleton"></div>
          </div>
    );
};

export default ProfileInfoSkeleton;