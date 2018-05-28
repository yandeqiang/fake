export function autobind () {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    descriptor.vaule = () => {
      target[key].bind(this)
    }
  }
}
