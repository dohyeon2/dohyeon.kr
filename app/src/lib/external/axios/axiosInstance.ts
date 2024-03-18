import axios from "axios";

const api = axios.create({
    baseURL: process.env.INTERNAL_APP_URL,
});

export { api };
