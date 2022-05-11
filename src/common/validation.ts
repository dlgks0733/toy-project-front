import { createDecorator, VueDecorator } from 'vue-class-component'
import 'reflect-metadata'

const validationsKey = Symbol('validationsKey')

/**
 * @param min 최소 길이
 * @param max 최대 길이
 */
export function Size(min: number, max: number): VueDecorator {
    return createDecorator((options: any, key) => {
        let validtions = Reflect.getMetadata(validationsKey, options)
        if (!validtions) {
            // 메타데이터에 값이 없으면 초기화
            validtions = {}
        }
        // 비공백 문자 수 제한 정규식
        validtions[key] = new RegExp(`^\\s*(?:\\S\\s*){${min},${max}}$`)
        Reflect.defineMetadata(validationsKey, validtions, options)
        console.log(options)
        console.log('validationsKey', Reflect.getMetadata(validationsKey, options))
    })
}

// TODO: property의 실시간 변경 감지 or 컴포넌트 훅을 이용해서 결과 리턴
