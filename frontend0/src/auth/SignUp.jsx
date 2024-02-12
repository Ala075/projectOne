import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseMultiStepForm from "./useMultiStepForm.jsx";
import Progress from "../components/progress/Progress.jsx";
import img from "../assets/arbre.jpg";
import UseOTP from "./useOTP.jsx";
import StepOne from "./stepOne.jsx";
import StepTwo from "./stepTwo.jsx";
import StepThree from "./stepThree.jsx";
import Cookie from "cookie-universal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../api/Config.jsx";
import "./auth.css";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const cookie = Cookie();
  const circles = [1, 2, 3];
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [repeatPwd, setRepeatPwd] = useState("");
  const [otp, setOtp] = useState("");

  const [inputError, setInputError] = useState({
    username: "* Ivalid username !",
    email: "* Invalid email format !",
    password: "* You should write a strong password !",
    repeatPwd: "* password don't match !",
    otp: "* OTP don't match !",
    message: "",
  });

  // OTP Hook
  const {
    otp: generatedOTP,
    generateOTP,
    isLoading: otpLoading,
  } = UseOTP();

  useEffect(() => {
    generateOTP();
  });

  const showError = (message) => {
    setInputError((prevError) => ({ ...prevError, message }));
    toast.error(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLastStep) return next();

    const formData = {
      name: user,
      email,
      password: pwd,
    };

    setIsLoading(true);

    try {
      const res = await axios.post(`${BASE_URL}/signup`, formData);

      if (res.status === 200) {
        const { token, user: userId } = res.data;

        const options = { expires: new Date(Date.now() + 86400 * 1000) }; // 1 day expiration

        cookie.set("eShop", token, options);
        cookie.set("userId", userId, options);

        navigate("/", { replace: true });
      }
    } catch (error) {
      showError(error.res?.data.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSign = () => {
    navigate("/login");
  };

  {
    /* Multi Step Hook*/
  }
  const { currentStep, step, next, back, isFirstStep, isLastStep } =
    UseMultiStepForm([
      <StepOne
        key={user._id}
        user={user}
        error={inputError}
        email={email}
        setUser={setUser}
        setEmail={setEmail}
      />,
      <StepTwo
        key={user._id}
        error={inputError}
        pwd={pwd}
        repeatPwd={repeatPwd}
        setPwd={setPwd}
        setRepeatPwd={setRepeatPwd}
      />,
      <StepThree
        key={user._id}
        otp={otp}
        setOtp={setOtp}
        valideOTP={generatedOTP}
        error={inputError}
      />,
    ]);

  return (
    <>
      <ToastContainer position="bottom-center" autoClose={5000} />
      <section className="login">
        <div className="container">
          <div className="content">
            <div className="img">
              <img src={img} alt="Sign" />
            </div>

            <div className="box">
              <form className="form" id="form1" onSubmit={handleSubmit}>
                <div className="head_form">
                  <span>Sign Up</span>
                  <p>Create a new account</p>
                </div>
                <Progress currentStep={currentStep} circles={circles} />

                {step}

                <div className="log">
                  <div className="btns">
                    <button
                      type="button"
                      id="prev"
                      onClick={back}
                      disabled={isFirstStep}
                    >
                      <i className="fa-solid fa-reply"></i>
                    </button>

                    <button
                      type="submit"
                      id="next"
                      disabled={isLoading || otpLoading}
                    >
                      {isLoading || otpLoading
                        ? "Creating account..."
                        : isLastStep
                        ? "Submit"
                        : "Next"}
                    </button>
                  </div>
                  <p>
                    Already have an account,{" "}
                    <span onClick={handleSign}>Sign-In</span>
                  </p>
                  <div className="or">
                    <span>OR</span>
                  </div>

                  <p>
                    <i className="fa-brands fa-google"></i> Sign in with Google
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
