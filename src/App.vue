<template>
    <v-app>
        <app-header />
        <app-main />
        <app-footer />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppHeader from '@/components/base/appHeader.vue'
import AppMain from '@/components/base/appMain.vue'
import AppFooter from '@/components/base/appFooter.vue'

@Component({
    components: {
        AppHeader,
        AppMain,
        AppFooter
    }
})
export default class App extends Vue {}
</script>
