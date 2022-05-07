import axios from '@/common/axios'
import { URL } from '@/service/constant/httpConstant'
import { YesOrNo } from '@/service/constant/commonEnums'

// 권한요약정보 Response DTO
export interface RoleSummaryInfoDTO {
    roleId: string // 권한 ID
    roleName: string // 권한 명
    roleUseYn: YesOrNo // 권한 사용여부
}

export default class Role {}
