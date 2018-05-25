export interface VNode {
  sel: string
  data: object
  children: Array<VNode>
  text: string
  elm: Node|null
  key: string | number
}

export interface vNodeData {
  key?: string|number
}

export default function toVnode (
  sel: string|undefined,
  data: vNodeData|undefined,
  children: Array<VNode>|undefined,
  text: string|undefined,
  elm: Node|null
):VNode {
  const key = data && data.key
  return {
    sel,
    data,
    children,
    text,
    elm,
    key
  }
}