import { isObject, isArray, isPlainObject } from 'src/util/predict'
import { proxyToRaw } from './store'
import { Dep } from './dep'

interface defineObject {
  __dep__: Dep
}

const IS_ARRAY = Symbol('is array')

export function observe(data: any): object {
  if (!isObject(data)) return data // return when data is non-object

  // array & object
  Object.keys(data).forEach(item => {
    data[item] = observe(data[item])
  })

  return defineReactive(data)
}

function defineReactive(target: defineObject) {
  const dep = target.__dep__ ? target.__dep__ : new Dep() // 将 dep 封在这个 object 上
  const proxy = new Proxy(target, {
    get(target: object, key: string | symbol) {
      if (key === '__dep__') return dep

      const result = Reflect.get(target, key)
      if (Dep.target && key !== '__dep__') {
        key = isArray(target) ? IS_ARRAY : key

        // target.key hasChanged
        dep.depend(key, Dep.target)
        const child = target[key]
        // target.key's children hasChanged
        if (isObject(child)) {
          for (const i in child) {
            child[i].__dep__ && child[i].__dep__.depend(key, Dep.target)
          }
        }
      }
      // 收集依赖
      return result
    },
    set(target: object, key: string | symbol, value: any) {
      Reflect.set(target, key, observe(value))
      // 触发依赖
      key = isArray(target) ? IS_ARRAY : key
      dep.notify(key, value)
      // 再次收集依赖
      return true
    }
  })
  proxyToRaw.set(proxy, target)
  return proxy
}
