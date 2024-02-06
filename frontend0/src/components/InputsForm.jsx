import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputsForm = (props) => {
  const [inputType, setInputType] = useState(props.type);
  const [focused, setFocused] = useState(false);

  const handleEyeClick = () => {
    setInputType((currentType) =>
      currentType === "password" ? "text" : "password"
    );
  };

  return (
    <>
      <label htmlFor={props.name}>{props.name}</label>
      <div className="input-container" style={{ position: "relative" }}>
        <input
          id={props.name}
          type={inputType}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.setChange(e.target.value)}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
          pattern={props.pattern}
          minLength={props.type === "password" ? "6" : ""}
          required
        />
        {<p className="inputError">{props.error}</p>}
        {props.type === "password" &&
          (inputType === "password" ? (
            <EyeOff
              onClick={handleEyeClick}
              style={{
                position: "absolute",
                color: "gray",
                top: "50%",
                left: "90%",
                transform: "translate(-50%,-90%)",
                cursor: "pointer",
              }}
            />
          ) : (
            <Eye
              onClick={handleEyeClick}
              style={{
                position: "absolute",
                color: "gray",
                top: "50%",
                left: "90%",
                transform: "translate(-50%,-90%)",
                cursor: "pointer",
              }}
            />
          ))}
      </div>
    </>
  );
};

export default InputsForm;
