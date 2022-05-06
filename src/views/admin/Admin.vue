<template>
    <v-container fluid>
        <div class="tables-basic">
            <h1 class="page-title mt-10 mb-6">Admins</h1>
            <v-row>
                <v-col cols="12">
                    <v-card class="employee-list mb-1">
                        <crud-data-table title="Admin List" :headers="headers" :items="items" :isModFunc="true" :isDelFunc="false">
                            <template v-slot:form>
                                <v-row>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field label="ID"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field label="패스워드"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field label="이름"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field label="부서"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field label="이메일"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field label="휴대전화"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="4" md="6">
                                        <v-text-field label="유선전화"></v-text-field>
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
import { AdminListDTO } from '@/service/admin/admin'

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

    items: AdminListDTO[] = []

    mounted(): void {
        this.requestAdminList()
    }

    async requestAdminList(): Promise<void> {
        this.items = await new AdminService().getList()
    }

    async createAdmin(): Promise<void> {
        // TODO: 관리자 create
    }
}
</script>

<style src="./Admin.scss" lang="scss"></style>
