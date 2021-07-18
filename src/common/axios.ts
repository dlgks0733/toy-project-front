import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BACK_SERVER || 'http://localhost:9000',
    timeout: 6000
})

instance.interceptors.request.use(
    function (config) {
        // 필요 시 코드 추가
        return config
    },
    function (error) {
        // 필요 시 코드 추가
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    function (response) {
        // 필요 시 코드 추가
        return response
    },
    function (error) {
        // 필요 시 코드 추가
        return error
    }
)

export default instance
