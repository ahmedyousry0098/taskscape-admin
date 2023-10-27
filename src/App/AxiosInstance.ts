import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";

export const token = localStorage.getItem("token");
export const decoded: JwtPayload = jwtDecode(token!);

export const axiosInstance = axios.create({
  baseURL: "https://taskspace-rxco.onrender.com",
  headers: {
    token,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
