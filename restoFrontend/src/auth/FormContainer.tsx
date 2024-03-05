import img from "../assets/arbre.jpg";
import "./auth.css";

const FormContainer = () => {
  return (
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
  );
};

export default FormContainer;
