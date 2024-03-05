import React from "react";
import styled from "styled-components";
import InputsForm from "../components/InputsForm";

const OtpCode = styled.p`
  font-weight: 700;
  color: #fff;
  font-family: "Consolas", "Andale Mono", "Monaco", monospace;
  background: linear-gradient(45deg, #6d5bba, #8d58bf);
  padding:15px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  letter-spacing: 3px;
  display: flex;
  justify-content:center;
  align-items:center;
  margin: 15px 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width:100%;
  height: 25px;
  user-select: none;

  &:hover  {
    visibility:visible;
  }
`;

const StepThree = ({ otp, setOtp, valideOTP, error }) => (
  <>
    <OtpCode>{valideOTP}</OtpCode>
    <InputsForm
      name="OTP"
      type="text"
      placeholder="Enter the OTP code"
      value={otp}
      error={error.otp}
      setChange={setOtp}
      pattern={valideOTP}
    />
  </>
);

export default StepThree;
