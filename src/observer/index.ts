import {isObject, isArray} from 'src/util/predict'
import {Dep} from './dep'

interface defineObject {
  __dep__: Dep
}

export function observe (data: any): object {
  if(!isObject(data)) return data; // return when data is non-object

  // array & object
  Object.keys(data).forEach(item => {
    data[item] = observe(data[item])
  })

  return defineReactive(data)
}

function defineReactive (target: defineObject) {

  const dep = new Dep()
  return new Proxy(target, {
    get (target: object, key: string) {
      if(Dep.target) {
        dep.depend(key, Dep.target)
      }
      // 收集依赖
      return Reflect.get(target, key)
    },
    set (target: object, key: string, value: any) {
      // 触发依赖
      dep.notify(key, value)
      // 再次收集依赖
      Reflect.set(target, key, value)
      return true
    }
  })
}
