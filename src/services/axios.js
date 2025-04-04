import axios from 'axios';

const api = axios.create({
    baseURL: "url-base"
})

export default api