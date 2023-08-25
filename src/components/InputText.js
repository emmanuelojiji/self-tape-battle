
import "./InputText.scss";

const InputText = ({ type, placeholder, onChange, border, required }) => {

  return (
    <input
      type={type}
      className="input-text"
      placeholder={placeholder}
      onChange={onChange}
      style={{border: border}}
      required={required}
    />
  );
};

export default InputText;
