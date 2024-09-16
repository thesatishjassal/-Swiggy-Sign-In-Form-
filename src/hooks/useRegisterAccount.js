import { useState } from 'react';
import axios from 'axios';

const useRegisterAccount = (apiBaseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const registerAccount = async (fullName, phoneNumber) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(apiBaseUrl, {
        fullName,
        phoneNumber: `+91${phoneNumber}`, // Prefix phoneNumber with country code
    });

      setResponse(res.data);
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, registerAccount };
};

export default useRegisterAccount;
