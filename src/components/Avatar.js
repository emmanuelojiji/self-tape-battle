import "./Avatar.scss";

const Avatar = ({ size, image, borderRadius }) => {
  return (
    <div
      className="avatar"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundImage: `url(${image})`,
        borderRadius: borderRadius,
      }}
    ></div>
  );
};

export default Avatar;
