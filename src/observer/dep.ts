import {Watcher} from './watcher'

export class Dep {
  static target: Watcher|null
  subs: Array<Watcher>
  constructor () {
    this.subs = []
  }

  // 收集依赖
  depend (watcher: Watcher) {
    // console.log('depend')
    this.subs.push(watcher)
  }

  // 触发依赖
  notify (val: any) {
    // console.log('notify')
    this.subs.forEach(item => {
      item.fn(val)
    })
  }
}