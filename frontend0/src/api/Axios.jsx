import axios from "axios";
import { BASE_URL } from "./Config.jsx"
import Cookie from "cookie-universal";

const cookie = Cookie();
const token = cookie.get("eShop");

export const Axios = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`
    }
});
