import { useState, useEffect } from "react";

const useApiCall = (url: string) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        const jsonData = await response.json();
        setResponse(jsonData);
        setloading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  // custom hook returns value
  return { response, error, loading };
};

export default useApiCall;
