import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.INTERNAL_APP_URL,
});

export { axiosInstance };
