import { useState, useEffect, useCallback } from "react";

export default (axiosClient) => {
  const [error, setError] = useState(null);
  const requestInterceptor = axiosClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });
  const responseInterceptors = axiosClient.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
      return error;
    }
  );
  useEffect(() => {
    return () => {
      axiosClient.interceptors.request.eject(requestInterceptor);
      axiosClient.interceptors.response.eject(responseInterceptors);
    };
  }, [requestInterceptor, responseInterceptors, axiosClient]);

  const closeModal = useCallback(() => setError(null), []);

  return [error, closeModal];
};
