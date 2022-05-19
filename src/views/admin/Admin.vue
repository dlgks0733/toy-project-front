<template>
    <v-container fluid>
        <div class="tables-basic">
            <h1 class="page-title mt-10 mb-6">Admins</h1>
            <v-row>
                <v-col cols="12">
                    <v-card class="employee-list mb-1">
                        <crud-data-table title="Admin List" :headers="headers" :items="items" :is-mod-func="true" :is-del-func="false" :is-btn-disabled="disabledCreateBtn" @create="createAdmin" @reset="resetFields" @set-info="setInfo">
                            <template v-slot:form>
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adId" :rules="adIdRules" label="ID"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adPwd" :rules="adPwdRules" type="password" label="패스워드"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adName" :rules="adNameRules" label="이름"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adDept" :rules="adDeptRules" label="부서"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adEmail" :rules="adEmailRules" label="이메일"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adPhone" :rules="adPhoneRules" label="휴대전화"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adTel" :rules="adTelRules" label="유선전화"></v-text-field>
                                    </v-col>
                                </v-row>
                            </template>
                            <template v-slot:info>
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adId" :rules="adIdRules" label="ID"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adPwd" :rules="adPwdRules" type="password" label="패스워드"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adName" :rules="adNameRules" label="이름"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adDept" :rules="adDeptRules" label="부서"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adEmail" :rules="adEmailRules" label="이메일"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adPhone" :rules="adPhoneRules" label="휴대전화"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adTel" :rules="adTelRules" label="유선전화"></v-text-field>
                                    </v-col>
                                </v-row>
                            </template>
                        </crud-data-table>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CrudDataTable from '@/components/DataTable/CrudDataTable.vue'
import AdminService, { AdminInfoDTO } from '@/service/admin/admin'
import { AdminListDTO, AdminCreateDTO } from '@/service/admin/admin'
import { YesOrNo } from '@/service/constant/commonEnums'
import { getLocalStorage } from '@/service/auth/auth'
import { Email, Phone, Size, Tel } from '@/common/validation'
import { isEmpty } from 'underscore'

@Component({
    components: {
        CrudDataTable
    }
})
export default class Admin extends Vue {
    headers: Array<Object> = [
        {
            text: 'ID',
            align: 'start',
            value: 'adId'
        },
        { text: '이름', value: 'adName' },
        { text: '부서', value: 'adDept' },
        { text: '사용여부', value: 'adUseYn' },
        { text: 'Actions', value: 'actions', sortable: false }
    ]

    items: AdminInfoDTO[] = []

    item!: AdminInfoDTO

    @Size(6, 100)
    adId = ''
    adIdRules = []

    @Size(6, 100)
    adPwd = ''
    adPwdRules = []

    @Size(2, 25)
    adName = ''
    adNameRules = []

    @Size(2, 20)
    adDept = ''
    adDeptRules = []

    @Email()
    adEmail = ''
    adEmailRules = []

    @Phone()
    adPhone = ''
    adPhoneRules = []

    @Tel()
    adTel = ''
    adTelRules = []

    mounted(): void {
        this.requestAdminList()
    }

    get disabledCreateBtn(): boolean {
        return (
            isEmpty(this.adId) ||
            isEmpty(this.adPwd) ||
            isEmpty(this.adName) ||
            isEmpty(this.adDept) ||
            isEmpty(this.adEmail) ||
            isEmpty(this.adPhone) ||
            !isEmpty(this.adIdRules) ||
            !isEmpty(this.adPwdRules) ||
            !isEmpty(this.adNameRules) ||
            !isEmpty(this.adDeptRules) ||
            !isEmpty(this.adEmailRules) ||
            !isEmpty(this.adPhoneRules)
        )
    }

    async requestAdminList(): Promise<void> {
        this.items = await new AdminService().getList()
    }

    async createAdmin(): Promise<void> {
        const tokenDto = getLocalStorage()
        const requestData: AdminCreateDTO = {
            adId: this.adId,
            adPwd: this.adPwd,
            adName: this.adName,
            adDept: this.adDept,
            adPhone: this.adPhone.replace(/[^0-9]/g, ''),
            adEmail: this.adEmail,
            adTel: this.adTel.replace(/[^0-9]/g, ''),
            adUseYn: YesOrNo.N,
            regId: tokenDto.adId,
            chgId: tokenDto.adId
        }
        await new AdminService().create(requestData)
        this.$toast.success('관리자를 등록했습니다.')
        this.requestAdminList()
    }

    resetFields(): void {
        this.adId = ''
        this.adPwd = ''
        this.adName = ''
        this.adDept = ''
        this.adEmail = ''
        this.adPhone = ''
        this.adTel = ''
    }

    setInfo(item: object) {
        this.item = item as AdminInfoDTO
        //TODO: return promise<boolean>
    }
}
</script>

<style src="./Admin.scss" lang="scss"></style>
