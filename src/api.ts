import axios from "axios";

const API_BASE_URL = axios.create({
  baseURL: "https://shopzify-products.onrender.com",
});

export default API_BASE_URL;
