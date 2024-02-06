import axios from "axios";
import { useState, useEffect } from "react";

function useGFetch(url) {
  const [data, setData] = useState(null);
  const [isSubmit, setisSubmit] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res) {
          setData(res.data);
          setisSubmit(false);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setisSubmit(false);
      }
    };
    return () => getData();
  }, [url]);

  return { data, isSubmit, error };
}
export default useGFetch;
