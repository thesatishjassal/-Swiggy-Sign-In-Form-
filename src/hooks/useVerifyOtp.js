import { useState } from 'react';
import axios from 'axios';

const useVerifyOtp = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [statusCode, setStatusCode] = useState(null); // To store response status code

    const verifyOtp = async (phoneNumber, otp) => {
        setLoading(true);
        setError(null);
        setStatusCode(null); // Reset status code before making request

        try {
            const res = await axios.post(url, {
                phoneNumber: `+91${phoneNumber}`, // Prefix phoneNumber with country code
                otp
            });
            setResponse(res.data);
            setStatusCode(res.status); // Store response status code
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred');
            setStatusCode(err.response ? err.response.status : null); // Store error status code
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, statusCode, verifyOtp };
};

export default useVerifyOtp;
