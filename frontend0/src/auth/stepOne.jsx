// StepOne.js
import React from "react";
import InputsForm from "../components/InputsForm";

const StepOne = ({ user, email, setUser, setEmail, error }) => (
  <>
    <InputsForm
      name="Username"
      type="text"
      placeholder="Enter a username"
      value={user}
      error={error.username}
      setChange={setUser}
      pattern="^[A-Za-z0-9]{3,17}$"
    />
    <InputsForm
      name="Email"
      type="email"
      placeholder="Enter an email"
      value={email}
      error={error.email}
      setChange={setEmail}
    />
  </>
);

export default StepOne;
