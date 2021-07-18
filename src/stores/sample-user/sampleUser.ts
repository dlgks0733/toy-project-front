import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/stores/index'
import SampleUserService from '@/service/sample-user/sampleUser'
import type { SampleUserReq, SampleUserRes } from '@/service/sample-user/sampleUser'

@Module({ store, namespaced: true, name: 'SampleUser', dynamic: true })
class SampleUserModule extends VuexModule {
    sampleUserRes: SampleUserRes | null = null

    @Action
    async requestCreateSampleUser(requestData: SampleUserReq): Promise<SampleUserRes> {
        return await new SampleUserService().createSampleUser(requestData)
    }
}

export default getModule(SampleUserModule)
