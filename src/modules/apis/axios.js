import axios from "axios";
const DEV_URL = "https://kvxkntwv97.execute-api.us-west-1.amazonaws.com/dev/";
const X_API_KEY = "uqPuHMstri4DocC8Yix7w7NsFVafI16Q5Fmwa3Ip";

export default axios.create({
  baseURL: DEV_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": X_API_KEY
  }
});