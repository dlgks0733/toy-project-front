<template>
    <v-app>
        <v-container fluid class="pa-0">
            <v-row no-gutters>
                <v-col cols="7" class="main-part d-none d-md-none d-lg-flex">
                    <div class="d-flex">
                        <v-img src="@/assets/logo.svg" contain></v-img>
                        <p>Vue Toy Project</p>
                    </div>
                </v-col>
                <v-col cols="12" lg="5" class="login-part d-flex align-center justify-center">
                    <v-row no-gutters class="align-start">
                        <v-col cols="12" class="login-part d-flex align-center justify-center flex-column">
                            <div class="login-wrapper pt-md-4 pt-0">
                                <v-tabs grow>
                                    <v-tabs-slider></v-tabs-slider>
                                    <v-tab :href="`#tab-login`"> LOGIN </v-tab>

                                    <v-tab-item :value="'tab-login'">
                                        <v-form>
                                            <v-container>
                                                <v-row class="flex-column">
                                                    <v-form>
                                                        <v-col>
                                                            <v-text-field v-model="adId" :rules="adIdRules" label="ID" required @keydown.enter="login"></v-text-field>
                                                            <v-text-field v-model="adPwd" :rules="adPwdRules" type="password" label="Password" required @keydown.enter="login"></v-text-field>
                                                        </v-col>
                                                        <v-col class="d-flex justify-space-between">
                                                            <v-btn class="text-capitalize" large :disabled="disabledLoginBtn" color="primary" @click="login"> Login</v-btn>
                                                            <v-btn large text class="text-capitalize primary--text">Forget Password</v-btn>
                                                        </v-col>
                                                    </v-form>
                                                </v-row>
                                            </v-container>
                                        </v-form>
                                    </v-tab-item>
                                </v-tabs>
                            </div>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-center">
                            <v-footer>
                                <div class="primary--text">© 2014-2020 <a href="https://flatlogic.com/" class="text-decoration-none">Flatlogic</a>, LLC. All rights reserved.</div>
                            </v-footer>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AuthService from '@/service/auth/auth'
import { TokenDTO, setLocalStorage, getLocalStorage } from '@/service/auth/auth'
import { Size } from '@/common/validation'
import { isEmpty } from 'underscore'

@Component
export default class Login extends Vue {
    @Size(6, 100)
    adId = ''
    adIdRules = []

    @Size(6, 100)
    adPwd = ''
    adPwdRules = []

    created(): void {
        const tokenDto = getLocalStorage()
        if (tokenDto.token) {
            this.$router.push('/dashboard')
        }
    }

    get disabledLoginBtn(): boolean {
        return isEmpty(this.adId) || isEmpty(this.adPwd) || !isEmpty(this.adIdRules) || !isEmpty(this.adPwdRules)
    }

    async login(): Promise<void | boolean> {
        if (this.disabledLoginBtn) {
            this.$toast.error('아이디 또는 비밀번호를 확인해주세요.')
            return false
        }
        const tokenDTO: TokenDTO = await new AuthService().login({ adId: this.adId, adPwd: this.adPwd })
        if (tokenDTO.token) {
            setLocalStorage(tokenDTO.token, tokenDTO.adId)
            this.$router.push('/dashboard')
        } else {
            this.$toast.error('아이디 또는 비밀번호를 잘못 입력했습니다.')
        }
    }
}
</script>

<style src="./Login.scss" lang="scss" />
