import axios from 'axios'
import router from '@/router/index'
import Vue from 'vue'
import { URL } from '@/service/constant/httpConstant'
import { removeLocalStorage, getLocalStorage } from '@/service/auth/auth'

const instance = axios.create({
    baseURL: process.env.VUE_APP_FRONT_SERVER || 'http://localhost:3000',
    timeout: 6000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }
})

instance.interceptors.request.use(
    // request시 JWT 설정
    function (config) {
        const tokenDto = getLocalStorage()
        config.headers.Authorization = 'Bearer ' + tokenDto.token
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
        // login 이후 토큰 만료되었을 때, error interceptor 설정
        const res = error.response
        if (res.status === 401 && res.config.url !== URL.AUTH) {
            removeLocalStorage()
            Vue.$toast.error('인증 토큰이 만료되었습니다.')
            router.push('/login')
        }
        // TODO: refresh token 설정, 공통에러처리
        return error
    }
)

export default instance
