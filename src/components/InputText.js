
import "./InputText.scss";

const InputText = ({ type, placeholder, onChange, border }) => {

  return (
    <input
      type={type}
      className="input-text"
      placeholder={placeholder}
      onChange={onChange}
      style={{border: border}}
    />
  );
};

export default InputText;
