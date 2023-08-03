import "./Avatar.scss";

const Avatar = ({ size, image }) => {
  return (
    <div
      className="avatar"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${image})`,
      }}
    ></div>
  );
};

export default Avatar;
