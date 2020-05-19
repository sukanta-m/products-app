import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_HOST_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.REACT_APP_X_API_KEY
  }
});