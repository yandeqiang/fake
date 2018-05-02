import {Dep} from './dep'

export class Watcher {
  target: object
  exp: string
  fn: Function
  value: any
  constructor (target, exp, fn) {
    this.exp = exp
    this.fn = fn
    this.pushTarget()
    // console.log(target, exp, target[exp])
    this.value = target[exp]
  }

  pushTarget () {
    Dep.target = this
  }

  popTarget () {
    Dep.target = null
  }
}