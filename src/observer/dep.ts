import { Watcher } from './watcher'

export class Dep {
  static target: Watcher | null
  subs: Map<any, any>
  constructor() {
    this.subs = new Map()
  }

  // 收集依赖
  depend(key: string | symbol, watcher: Watcher) {
    // console.log('depend')
    this.subs.set(key, watcher)
  }

  // 触发依赖
  notify(key: string | symbol, val: any) {
    // console.log('notify')
    this.subs.get(key) && this.subs.get(key).update()
  }
}

export function pushTarget(watcher: Watcher) {
  Dep.target = watcher
}

export function popTarget() {
  Dep.target = null
}
