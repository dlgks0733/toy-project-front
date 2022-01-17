<template>
    <v-main>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </v-main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppMain extends Vue {}
</script>
