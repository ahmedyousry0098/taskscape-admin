import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://taskspace-rxco.onrender.com",
  headers: {
    // token: localStorage.getItem("token"),
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
