import axios from "axios";
const { REACT_APP_HOST_URL, REACT_APP_X_API_KEY } = process.env;

export default axios.create({
  baseURL: REACT_APP_HOST_URL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": REACT_APP_X_API_KEY
  }
});