import { observe } from "./observer/index"
import { Watcher } from "./observer/watcher"

class fakeVue {
  _data: object
  vNode: object
  constructor(options) {
    this._data = options.data || {}
    this.initData()
    this.initRender()
  }

  initData() {
    this._data = observe(this._data)
  }

  initRender() {
    new Watcher(this._data, "a", val => {
      console.log("watcher", val)
    })
  }
}

export default fakeVue
