import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 10000,
});

export default API;