import toVnode, {VNode} from './vnode'
/**
 * 
 * @param sel 
 * @param data 
 * @param children 
 * @return VNode
 */
export function createElement (sel: any, data?: any, children?: any): VNode {
  children.forEach((item, i) => {
    if(typeof item === 'string' || typeof item === 'number') {
      children[i] = toVnode(undefined, undefined, undefined, item, null)
    }
  });
  return toVnode(sel, data, children, undefined, null)
}