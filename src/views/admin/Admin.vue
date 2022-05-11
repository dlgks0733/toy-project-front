<template>
    <v-container fluid>
        <div class="tables-basic">
            <h1 class="page-title mt-10 mb-6">Admins</h1>
            <v-row>
                <v-col cols="12">
                    <v-card class="employee-list mb-1">
                        <crud-data-table title="Admin List" :headers="headers" :items="items" :isModFunc="true" :isDelFunc="false" @create="createAdmin" @reset="reset">
                            <template v-slot:form>
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adId" label="ID"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adPwd" type="password" label="패스워드"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adName" label="이름"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adDept" label="부서"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adEmail" label="이메일"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adPhone" label="휴대전화"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field v-model="adTel" label="유선전화"></v-text-field>
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
import AdminService from '@/service/admin/admin'
import { AdminListDTO, AdminCreateDTO } from '@/service/admin/admin'
import { YesOrNo } from '@/service/constant/commonEnums'
import { getLocalStorage } from '@/service/auth/auth'
import { Size } from '@/common/validation'

@Component({
    components: {
        CrudDataTable
    }
})
export default class Admin extends Vue {
    // TODO: validate 추가
    valid = true

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

    items: AdminListDTO[] = []

    @Size(1, 6)
    adId = ''
    adPwd = ''
    adName = ''
    adDept = ''
    adEmail = ''
    adPhone = ''
    adTel = ''

    mounted(): void {
        this.requestAdminList()
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
            adPhone: this.adPhone,
            adEmail: this.adEmail,
            adTel: this.adTel,
            adUseYn: YesOrNo.N,
            regId: tokenDto.adId,
            chgId: tokenDto.adId
        }
        await new AdminService().create(requestData)
        this.$toast.success('관리자를 등록했습니다.')
        this.requestAdminList()
    }

    reset(): void {
        this.adId = ''
        this.adPwd = ''
        this.adName = ''
        this.adDept = ''
        this.adEmail = ''
        this.adPhone = ''
        this.adTel = ''
    }
}
</script>

<style src="./Admin.scss" lang="scss"></style>
