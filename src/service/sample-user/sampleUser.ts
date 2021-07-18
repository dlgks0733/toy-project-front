import axios from '@/common/axios'
import { URL } from '@/service/constant/httpConstant'

export interface SampleUserReq {
    name: string
    age: number
}

export interface SampleUserRes {
    name: string
    age: number
}

export default class SampleUserService {
    async createSampleUser(requestData: SampleUserReq): Promise<SampleUserRes> {
        return await axios.post(`${URL.SAMPLE_USER}/save`, requestData)
    }
}
