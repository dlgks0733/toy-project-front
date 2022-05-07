import axios from '@/common/axios'
import { URL } from '@/service/constant/httpConstant'

// Login Request DTO
export interface LoginDTO {
    adId: string // Admin ID
    adPwd: string // Admin Password
}

// Token Response DTO
export interface TokenDTO {
    token: string // JWT
    adId: string // Admin ID
}

// LocalStorage 설정
export function setLocalStorage(token: string, adId: string): void {
    const auth: TokenDTO = {
        token: token,
        adId: adId
    }
    localStorage.setItem('auth', JSON.stringify(auth))
}

// LocalStorage 제거
export function removeLocalStorage(): void {
    localStorage.removeItem('auth')
}

// LocalStorage 가져오기
export function getLocalStorage(): TokenDTO {
    const auth: string | null = localStorage.getItem('auth') || null
    if (!auth) {
        const emptyAuth: TokenDTO = {
            token: '',
            adId: ''
        }
        return emptyAuth
    }
    return JSON.parse(auth) as TokenDTO
}

export default class Auth {
    async login(loginDto: LoginDTO): Promise<TokenDTO> {
        return await axios.post(`${URL.AUTH}`, loginDto)
    }
}
