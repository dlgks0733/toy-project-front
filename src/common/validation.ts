import { createDecorator, VueDecorator } from 'vue-class-component'
import 'reflect-metadata'

const validationsKey = Symbol('validationsKey')

// decorator 생성
function createCustomDecorator(regExp: RegExp, errMsg: string): VueDecorator {
    return createDecorator((options, key) => {
        let validtions = Reflect.getMetadata(validationsKey, options)
        if (!validtions) {
            validtions = {}
        }
        validtions[key] = {
            regExp: regExp,
            errMsg: errMsg
        }
        Reflect.defineMetadata(validationsKey, validtions, options)
        createValidator(options)
    })
}

// methods 객체에 validator 등록
function createValidator(options: any) {
    const metadata = Reflect.getMetadata(validationsKey, options)
    const keys = Object.keys(metadata)
    const currentKey = keys[keys.length - 1]
    options.methods[`${currentKey}Validator`] = function validator(value: any) {
        const validtions = metadata[currentKey]
        if (!validtions.regExp.test(value) && value) {
            this.$data[`${currentKey}Rules`].push(false || validtions.errMsg)
        } else {
            this.$data[`${currentKey}Rules`] = []
        }
    }
    createWatch(options)
}

// watch 등록
function createWatch(options: any) {
    const metadata = Reflect.getMetadata(validationsKey, options)
    const keys = Object.keys(metadata)
    const currentKey = keys[keys.length - 1]
    if (!options.watch) {
        options.watch = {}
    }
    options.watch[currentKey] = [
        {
            handler: `${currentKey}Validator`,
            deep: false,
            immediate: false,
            user: true
        }
    ]
}

/**
 * @param min 최소 길이
 * @param max 최대 길이
 * @param errMsg 에러 메세지
 */
export function Size(min: number, max: number, errMsg: string): VueDecorator {
    return createCustomDecorator(new RegExp(`^\\s*(?:\\S\\s*){${min},${max}}$`), errMsg)
}

/**
 * @param errMsg 에러 메세지 (default: '이메일 형식에 맞지 않습니다.')
 */
export function Email(errMsg = '이메일 형식에 맞지 않습니다.'): VueDecorator {
    return createCustomDecorator(new RegExp('^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\\.[a-zA-Z]{2,3}$'), errMsg)
}

/**
 * @param errMsg 에러 메세지 (default: '휴대전화 형식에 맞지 않습니다.')
 */
export function Phone(errMsg = '휴대전화 형식에 맞지 않습니다.'): VueDecorator {
    return createCustomDecorator(new RegExp('^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$'), errMsg)
}

/**
 * @param errMsg 에러 메세지 (default: '유선전화 형식에 맞지 않습니다.')
 */
export function Tel(errMsg = '유선전화 형식에 맞지 않습니다.'): VueDecorator {
    return createCustomDecorator(new RegExp('^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-?(\\d{3,4})-?(\\d{4})$'), errMsg)
}
