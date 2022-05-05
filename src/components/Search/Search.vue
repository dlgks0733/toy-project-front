<template>
    <form action="#">
        <label :data-state="state">
            <input type="text" placeholder="Search" @click="state = 'open'" @blur="state = 'close'" />
            <v-icon :color="config.light.iconColor" size="28">mdi-magnify</v-icon>
        </label>
    </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import config from '@/styles/config'

@Component
export default class Search extends Vue {
    config = config
    state = 'close'
}
</script>

<style src="./Search.scss" lang="scss"></style>
