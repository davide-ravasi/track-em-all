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
        if (error instanceof Error) {
          // Handle the error object
          setError(error.message);
        } else {
          // Handle any other exceptions
          setError("An unknown error occurred");
        }
      }
    };
    fetchData();
  }, [url]);

  // custom hook returns value
  return { response, error, loading };
};

export default useApiCall;
