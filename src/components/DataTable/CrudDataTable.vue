<template>
    <v-data-table :headers="headers" :items="items" class="elevation-1">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> 신규 등록 </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="text-h5">{{ formTitle }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <slot name="form"> </slot>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close"> 취소 </v-btn>
                            <v-btn color="blue darken-1" text @click="create"> 저장 </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">삭제하시겠습니까?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text>취소</v-btn>
                            <v-btn color="blue darken-1" text>삭제</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
            <v-icon v-if="isModFunc" small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
            <v-icon v-if="isDelFunc" small @click="editItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data> 데이터가 존재하지 않습니다. </template>
    </v-data-table>
</template>
<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
/**
 * CRUD 기능 Data Table
 * @Prop headers: 테이블 열 명칭
 * @Prop items: 행 데이터
 * @Prop title: 테이블 상단 명칭
 * @Prop isModFunc: 행 데이터 수정기능 여부
 * @Prop isDelFunc: 행 데이터 삭제기능 여부
 * @Slot form: 등록 및 수정 폼
 * @Emit create: 부모의 create 함수 실행 (등록 기능)
 * @Emit reset: 부모의 reset 함수 실행 (필드 초기화)
 */
@Component
export default class CrudDataTable extends Vue {
    @Prop({ type: Array, required: true }) headers!: Array<Object>
    @Prop({ type: Array, required: true }) items!: Array<Object>
    @Prop({ type: String, required: true }) title!: string
    @Prop({ type: Boolean, required: true }) isModFunc!: boolean
    @Prop({ type: Boolean, required: true }) isDelFunc!: boolean
    dialog = false
    dialogDelete = false
    editedIndex = -1

    get formTitle(): string {
        return this.editedIndex === -1 ? '신규 등록' : '수정'
    }

    // 상위컴포넌트 create Emit 함수
    @Emit()
    create(): null {
        this.close()
        return null
    }

    // 상위컴포넌트 reset Emit 함수
    @Emit()
    reset(): null {
        return null
    }

    close(): void {
        this.dialog = false
        this.$nextTick(() => {
            this.reset()
            this.editedIndex = -1
        })
    }

    editItem(item: Object): void {
        this.editedIndex = 0
        console.log('item', item)
        // this.editedItem = Object.assign({}, item)
        this.dialog = true
    }
}
</script>
