import axios from '@/common/axios'
import { URL } from '@/service/constant/httpConstant'

export interface AdminListDTO {
    adId: string
    adName: string
    adDept: string
    adUseYn: string
}

export default class Admin {
    async getList(): Promise<AdminListDTO[]> {
        return axios.get(`${URL.ADMIN}`)
    }
}
