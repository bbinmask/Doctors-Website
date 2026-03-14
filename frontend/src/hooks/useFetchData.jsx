import { useState, useEffect } from "react";
import { token } from "../config";
import { toast } from "react-toastify";
const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const result = await res.json();

        if (!res.ok) {
          setLoading(false);
          toast.error(result.message);
          throw new Error(result.message);
        }

        setData(result.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.message);
        setError(error.message + " 🤢");
      }
    };
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
