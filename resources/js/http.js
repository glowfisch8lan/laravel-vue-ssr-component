import axios from 'axios'

const http = axios.create({
    baseURL: process.env.MIX_API,
});

http.interceptors.response.use(function (response) {
    /** [success: true, data: ''] */
    return response.data.data;
}, function (error) {
    if ((error?.response?.status || 0) === 422) {
        return Promise.reject(JSON.parse(error?.response?.data?.message));
    }
    /** [success: false, message: ''] */
    return Promise.reject(error?.response?.data?.message || 'Сервер недоступен');
});

export default http
