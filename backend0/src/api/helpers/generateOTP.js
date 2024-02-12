// generateOTP.js

import otpGenerator from "otp-generator";

// Fonction pour générer un OTP
const generateOTP = () => {
  // Générer un OTP de 4 chiffres
  const otp = otpGenerator.generate(4, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  return otp;
};

export default generateOTP;