import { useState } from "react";
import axios from "axios";

function UsePFetch(url, options = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    setIsLoading(true);
    
    try {
      const res = await axios(url, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          ...options.headers,
        },
        data: JSON.stringify(formData),
        ...options,
      });
      console.log(res);
      return res;
    } catch (err) {
      setError(err.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, submitForm };
}

export default UsePFetch;
