import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const authPrefix = process.env.NEXT_PUBLIC_AUTH_PREFIX;

export const authInstance = axios.create({
    baseURL: `${baseUrl}/${authPrefix}`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
