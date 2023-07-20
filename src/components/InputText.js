import "./InputText.scss";

const InputText = ({ type, placeholder, onChange }) => {
  return (
    <input
      type={type}
      className="input-text"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputText;
