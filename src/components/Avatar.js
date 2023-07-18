import "./Avatar.scss";

const Avatar = ({ size }) => {
  return (
    <div
      className="avatar"
      style={{ width: `${size}px`, height: `${size}px` }}
    ></div>
  );
};

export default Avatar;
