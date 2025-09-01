import type { FetchResult } from "@/lib/share";
import axios, { type AxiosResponse } from "axios";

export const http = axios.create({
    baseURL: '/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

axios.interceptors.response.use((response: AxiosResponse<FetchResult<unknown>>) => {
    switch (response.status) {
        case 401: {
            location.href = `login/?redirect=${location.pathname}`;
        } break;
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});