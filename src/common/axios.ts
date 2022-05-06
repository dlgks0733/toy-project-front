import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_FRONT_SERVER || 'http://localhost:3000',
    timeout: 6000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    function (config) {
        let token
        if (!token) {
            token = localStorage.getItem('JWT')
        }
        config.headers.Authorization = 'Bearer ' + token
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function (response) {
        return response.data
    },
    function (error) {
        return error
    }
)

export default instance
