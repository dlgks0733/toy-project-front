import { createDecorator, VueDecorator } from 'vue-class-component'
import 'reflect-metadata'

const validationsKey = Symbol('validationsKey')

// TODO: 유효하지 않을 때, ErrMsg 표시

/**
 * @param min 최소 길이
 * @param max 최대 길이
 */
export function Size(min: number, max: number): VueDecorator {
    return createDecorator((options, key) => {
        let validtions = Reflect.getMetadata(validationsKey, options)
        if (!validtions) {
            validtions = {}
        }
        validtions[key] = new RegExp(`^\\s*(?:\\S\\s*){${min},${max}}$`)
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
        const regExp = metadata[currentKey]
        if (!regExp.test(value)) {
            console.log('잘못된 값')
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
    console.log(options)
}
