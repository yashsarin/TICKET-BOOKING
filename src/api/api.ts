import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const API = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: { "Content-Type": "application/json" },
});
