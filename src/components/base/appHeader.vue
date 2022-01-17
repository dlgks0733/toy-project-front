<template>
    <fragment>
        <!-- <v-navigation-drawer v-model="drawer" app> </v-navigation-drawer> -->
        <v-app-bar app>
            <!-- <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon> -->
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>
    </fragment>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppHeader extends Vue {
    // drawer = true
}
</script>
