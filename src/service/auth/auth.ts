import axios from '@/common/axios'
import { URL } from '@/service/constant/httpConstant'

export interface LoginDTO {
    adId: string
    adPwd: string
}

export interface TokenDTO {
    token: string
}

export default class Auth {
    async login(loginDto: LoginDTO): Promise<TokenDTO> {
        return await axios.post(`${URL.AUTH}`, loginDto)
    }
}
