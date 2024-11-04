import axios from "axios";
import { baseUrl } from "./constants";

const axiosInstance = axios.create({ baseURL: baseUrl });
axiosInstance.interceptors.request.use((request) => {
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("token") || undefined
      : undefined;

  if (accessToken) {
    request.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;
