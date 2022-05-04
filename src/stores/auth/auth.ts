/**
 * Token은 LocalStorage에 저장하므로 Store 필요성이 없는 것으로 판단 아래 코드는 참고용
 */

// import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
// import store from '@/stores/index'
// import AuthService from '@/service/auth/auth'
// import type { LoginDTO, TokenDTO } from '@/service/auth/auth'

// @Module({ store, namespaced: true, name: 'Auth', dynamic: true })
// class AuthModule extends VuexModule {
//     token: TokenDTO | null = null

//     @Action({ commit: 'setToken' })
//     async requestLogin(loginDto: LoginDTO): Promise<TokenDTO> {
//         return await new AuthService().login(loginDto)
//     }
// }

// export default getModule(AuthModule)
