import axios, { HttpStatusCode } from "axios";



axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + (localStorage.getItem('token') || '');

axios.interceptors.request.use(
    (config) => {        
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === HttpStatusCode.Unauthorized) {
            localStorage.removeItem('token');
            window.location.reload();
        }
        return Promise.reject(error);
    }
);


export default axios



