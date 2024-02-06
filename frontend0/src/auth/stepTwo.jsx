import React from "react";
import InputsForm from "../components/InputsForm";

const StepTwo = ({ pwd, repeatPwd, setPwd, setRepeatPwd, error }) => (
  <>
    <InputsForm
      name="Password"
      type="password"
      placeholder="Enter a password"
      value={pwd}
      error={error.password}
      setChange={setPwd}
      pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$"
    />
    <InputsForm
      name="Repeat Password"
      type="password"
      placeholder="Repeat password"
      value={repeatPwd}
      error={error.repeatPwd}
      setChange={setRepeatPwd}
      pattern={pwd}
    />
  </>
);

export default StepTwo;
