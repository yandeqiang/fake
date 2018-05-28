import { observe } from './observer/index'
import { Watcher } from './observer/watcher'
import { createElement } from 'src/vdom/create-element'
import patch from 'src/vdom/patch'
import { VNode } from 'src/vdom/vnode'
import { autobind } from 'src/decorator/index'

interface Options {
  el: string
  data: object
  computed: object
  watch: object
  render: Function
}

function proxy(target: object, sourceKey: string) {
  return
}

class FakeVue {
  $options: Options
  _data: object
  _computed: object
  _vm: FakeVue // proxy 监听 this 的返回值
  _vnode: VNode | null
  vNode: object
  constructor(options) {
    this.$options = options
    this.initVm()
    this.initData()
    this.initComputed()
    this.initWatch()
    this.initRender()
    return this._vm
  }

  initVm() {
    this._vm = new Proxy(this, {
      get(target, key, receiver) {
        return (
          target._data[key] || (target._computed[key] && target._computed[key]()) || target[key]
        )
      },
      set(target, key, value) {
        if (target._data[key]) {
          return Reflect.set(target._data, key, value)
        } else {
          return Reflect.set(target, key, value)
        }
      }
    })
  }

  initData() {
    this._data = observe(this.$options.data)
  }

  initComputed() {
    this._computed = Object.create(null)
    const computed = this.$options.computed
    if (!computed) return
    Object.keys(computed).forEach(item => {
      this._computed[item] = computed[item].bind(this._vm)
    })
  }

  initWatch() {
    const watch = this.$options.watch
    if (!watch) return
    Object.keys(watch).forEach(item => {
      new Watcher(this._vm, item, watch[item])
    })
  }

  initRender() {
    this._update()
    new Watcher(this._vm, 'e', this._update.bind(this))
  }

  _update() {
    const { el, render } = this.$options
    const oldVnode = this._vnode || document.querySelector(el)
    const vnode = render.call(this, createElement)
    this._vnode = vnode
    patch(oldVnode, vnode)
  }
}

export default FakeVue
