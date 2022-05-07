import axios from '@/common/axios'
import { URL } from '@/service/constant/httpConstant'
import { YesOrNo } from '@/service/constant/commonEnums'
import { RoleSummaryInfoDTO } from '@/service/role/role'

// 관리자 목록 Response DTO
export interface AdminListDTO {
    adId: string // 관리자 ID
    adName: string // 관리자 이름
    adDept: string // 부서
    adUseYn: string // 관리자 사용여부
}

// 관리자 생성 Request DTO
export interface AdminCreateDTO {
    adId: string // 관리자 ID
    adName: string // 관리자 이름
    adPwd: string // 패스워드
    adPhone: string // 휴대전화
    adTel: string // 유선전화
    adEmail: string // 이메일
    adDept: string // 부서
    adUseYn: YesOrNo // 사용여부
    regId: string // 등록자
    chgId: string // 수정자
}

// 관리자 정보 Response DTO
export interface AdminInfoDTO {
    adId: string // 관리자 ID
    adName: string // 관리자 이름
    adPwd: string // 패스워드
    adPhone: string // 휴대전화
    adTel: string // 유선전화
    adEmail: string // 이메일
    adDept: string // 부서
    adUseYn: YesOrNo // 사용여부
    regId: string // 등록자
    regDt: Date // 등록일
    chgId: string // 수정자
    chgDt: Date // 수정일
    roleSummaryInfoList: RoleSummaryInfoDTO[] // 권한요약정보 목록
}

export default class Admin {
    async getList(): Promise<AdminListDTO[]> {
        return axios.get(`${URL.ADMIN}`)
    }

    async create(requestData: AdminCreateDTO): Promise<AdminInfoDTO> {
        return axios.post(`${URL.ADMIN}`, requestData)
    }
}
