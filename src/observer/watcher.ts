import {isObject, isArray, isPlainObject} from 'src/util/predict'
import {Dep, pushTarget, popTarget} from './dep'
import {queueWatcher} from './scheduler'
import {proxyToRaw} from './store'

let id = 0

export class Watcher {
  id: number
  target: object
  exp: string
  fn: Function
  value: any
  constructor (target, exp, fn) {
    this.id = id++
    this.exp = exp
    this.fn = fn
    this.target = target
    this.value = this.get()
  }

  get () {
    const {target, exp} = this
    pushTarget(this)
    let value = Reflect.get(target, exp)
    // value = transfer(value)
    isArray(value) && value.length
    popTarget()
    return value
  }

  update (target) {
    queueWatcher(this)
  }

  run () {
    const oldValue = this.value
    const value = this.value = this.get()
    this.fn(oldValue, value)
  }
}

// function transfer (value) {
//   const target = proxyToRaw.has(value) ? proxyToRaw.get(value) : value
//   for(let i in target) {
//     target[i] = transfer(target[i])
//   }
//   return target
// }
