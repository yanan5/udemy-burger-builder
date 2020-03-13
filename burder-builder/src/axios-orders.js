import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://udemy-burger-builder-8cbfd.firebaseio.com/"
});

export default axiosInstance;
