<template>
    <div>
        name : <input type="text" v-model="name" /> <br />
        age : <input type="number" v-model="age" /> <br />
        <button @click="createSampleUser">생성</button>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SampleUserModule from '@stores/sample-user/sampleUser'

@Component
export default class SampleUser extends Vue {
    name = ''
    age = 0

    async createSampleUser() {
        const data = await SampleUserModule.requestCreateSampleUser({ name: this.name, age: this.age })
        alert(data)
    }
}
</script>
