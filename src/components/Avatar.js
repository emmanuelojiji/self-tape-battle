import "./Avatar.scss";
import Headshot from "../media/headshot.jpeg";

const Avatar = ({ size, image }) => {
  return (
    <div
      className="avatar"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${Headshot})`,
      }}
    ></div>
  );
};

export default Avatar;
