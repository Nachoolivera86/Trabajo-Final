import { useEffect, useState } from "react";

const useFetch = (url, initialState) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState(initialState);
  useEffect(() => {
    if (url) {
      setLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => setResponseData(data))
        .catch((e) => setError(e.message, e.error))
        .finally(() => setLoading(false));
    }
  }, [url]);
  return { loading, error, data: responseData };
};

export default useFetch;

