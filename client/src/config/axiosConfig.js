import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://sweeft-chat-app.herokuapp.com/api/",
  baseURL: "https://localhost:3333",
});

export default axiosInstance;
