import { isObject, isArray, isPlainObject, isPrimitive } from './predict'
import nextTick from './next-tick'

function deepAssign(target, source) {
  if (isObject(source)) {
    target = target || {}
    for (let i in source) {
      if (!target[i]) {
        target[i] = isPrimitive(source[i]) ? '' : isArray(source[i]) ? [] : {}
      }
      target[i] = deepAssign(target[i], source[i])
    }
  }
  return source
}

export default {
  nextTick,
  deepAssign
}
