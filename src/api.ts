import axios from "axios";

const API = axios.create({
  baseURL: "https://shopzify-products.onrender.com",
});

export default API;
