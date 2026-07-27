import axios from "axios";

const api = axios.create({
  baseURL: "https://task-manager-backend-lor6.onrender.com/api",
  withCredentials: true,
});

export default api;
