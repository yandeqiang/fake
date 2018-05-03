export function _toString () {
  return Object.prototype.toString()
}
/**
 * isObject
 */
export function isObject(obj: object):boolean {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj: object):boolean {
  return _toString.call(obj) === '[object Object]'
}

export function isRegexp(reg: RegExp):boolean {
  return _toString.call(reg) === '[object RegExp]'
}

export function isArray(arr: Array<any>):boolean {
  return Array.isArray(arr)
}
