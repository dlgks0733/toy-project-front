<template>
    <v-app class="pa-6">
        <Header :drawer.sync="drawer" />
        <Sidebar :drawer.sync="drawer" />
        <v-main class="content">
            <router-view />
            <Footer />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/Header/Header.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import Footer from '@/components/Footer/Footer.vue'
import './Layout.scss'

@Component({
    components: {
        Footer,
        Header,
        Sidebar
    }
})
export default class Layout extends Vue {
    drawer = true
}
</script>

<style src="./Layout.scss" lang="scss" />
