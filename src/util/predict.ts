export function isUndef(s: any): boolean {
  return s === undefined
}
export function isDef(s: any): boolean {
  return s !== undefined
}
export function _toString() {
  return Object.prototype.toString()
}

export function isObject(obj: any): boolean {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

export function isRegexp(reg: any): boolean {
  return _toString.call(reg) === '[object RegExp]'
}

export function isArray(arr: any): boolean {
  return Array.isArray(arr)
}

export function isPrimitive(value: any): boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
