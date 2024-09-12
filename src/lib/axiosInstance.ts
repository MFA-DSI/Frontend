import axios from "axios";

const token = sessionStorage.getItem("token");
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  },
});
