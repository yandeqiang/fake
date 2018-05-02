import {Dep} from './dep'

export function observe (data) {
  return defineReactive(data)
}

function defineReactive (data) {
  const dep = new Dep();
  return new Proxy(data, {
    get (target: object, key: string) {
      // console.log(Dep.target)
      if(Dep.target) {
        dep.depend(Dep.target)
      }
      // 收集依赖
      return target[key]
    },
    set (target: object, key: string, value: any) {
      // console.log('set')
      // 触发依赖
      dep.notify(value)
      // 再次收集依赖
      target[key] = value
      return true
    }
  })
}
