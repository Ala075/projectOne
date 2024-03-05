import { useNavigate } from "react-router-dom";

const ErrorPage = ({ status }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="error__page">
      <h1>{status || 404}</h1>
      <p>Page not found</p>
      <div className="back">
        <div className="link" onClick={handleBack}>Back to Home</div>
      </div>
    </div>
  );
};

export default ErrorPage;
