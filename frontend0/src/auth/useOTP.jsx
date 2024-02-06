import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/Config";

const useOTP = () => {
    const [otp, setOTP] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otpError, setOTPError] = useState(null);

    const generateOTP = async () => {
        try {
            setIsLoading(true);
            const response = await axios(`${BASE_URL}/OTP`, {
                method: "GET"
            });

            if (!response.data.ok) {
                setOTP(response.data.otp);
                setIsLoading(false);
                setOTPError(null);
            } else {
                // Handle API response when 'ok' is false
                console.error("Failed to fetch OTP:", response.data.error);
                setOTPError(response.data.message);
                setIsLoading(false);
            }
        } catch (error) {
            // Handle API call error
            console.error("API call failed:", error.message);
            setOTPError("Failed to fetch OTP");
            setIsLoading(false);
        }
    };

    return { otp, isLoading, otpError, generateOTP };
};

export default useOTP;
