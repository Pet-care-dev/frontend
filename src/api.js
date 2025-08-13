// src/api.js
import axios from "axios";

const API = axios.create({
  // baseURL: "https://pets-project-1.onrender.com", // Backend URL
  baseURL: "http://127.0.0.1:8001", // Backend URL
});

export default API; 
