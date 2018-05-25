import { isDef, isUndef } from "src/util/predict"
import toVnode, { VNode } from "./vnode"
import api from "./htmldomapi"

function sameVnode(vnode: any, oldVnode: VNode) {
  return vnode.sel === oldVnode.sel && vnode.key === oldVnode.key
}

function createKeyToOldIdx (children: Array<VNode>, start, end) {
  children = children.slice(start, end)
  const map = new Map()
  children.forEach(item => {
    map[item.key] = item
  })
  return map
}

function emptyNodeAt(elm: any) {
  const id = elm.id ? "#" + elm.id : ""
  const className = elm.className ? "." + elm.className.split(" ").join(".") : ""
  const sel = elm.tagName.toLowerCase() + id + className
  return toVnode('', {}, [], undefined, elm)
}

function isVnode(vnode: any) {
  return isDef(vnode.sel)
}

function removeVnodes (parentElm: Node, children: Array<VNode>) {
  children.forEach(item => {
    api.appendChild(parentElm, item.elm)
  })
}

function addVnodes (parentElm: Node, children: Array<VNode>) {
  children.forEach(item => {
    api.removeChild(parentElm, item.elm)
  })
}

function createElm (vnode: VNode) {
  let data = vnode.data;
  let children = vnode.children;
  let sel = vnode.sel;
  // element 元素
  if (sel !== undefined) {
    // Parse selector
    let hashIdx = sel.indexOf('#');
    let dotIdx = sel.indexOf('.', hashIdx);
    let hash = hashIdx > 0 ? hashIdx : sel.length;
    let dot = dotIdx > 0 ? dotIdx : sel.length;
    let tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
    // 创建一个 element 节点 并且赋予它 id class 属性
    let elm = vnode.elm = api.createElement(tag);
    if (hash < dot) {
      elm.id = sel.slice(hash + 1, dot);
    }
    if (dotIdx > 0) {
      elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
    }
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; ++i) {
        let ch = children[i];
        if (ch != null) {
          api.appendChild(elm, createElm(ch));
        }
      }
    }else if (typeof vnode.text === 'string') {
      api.appendChild(elm, api.createTextNode(vnode.text));
    }
  } else { // 文本节点
    vnode.elm = api.createTextNode(vnode.text);
  }
  return vnode.elm;
}

function updateChildren (parentElm: Node, oldCh: Array<VNode>, newCh: Array<VNode>) {
  let oldStartIdx = 0, newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx: any;
  let idxInOld: number;
  let elmToMove: VNode;
  let before: any;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
    } else if (oldEndVnode == null) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (newStartVnode == null) {
      newStartVnode = newCh[++newStartIdx];
    } else if (newEndVnode == null) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode);
      api.insertBefore(parentElm, oldStartVnode.elm as Node, api.nextSibling(oldEndVnode.elm as Node));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode);
      api.insertBefore(parentElm, oldEndVnode.elm as Node, oldStartVnode.elm as Node);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      idxInOld = oldKeyToIdx[newStartVnode.key as string];
      if (isUndef(idxInOld)) { // New elment
        api.insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm as Node);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        if (elmToMove.sel !== newStartVnode.sel) {
          api.insertBefore(parentElm, createElm(newStartVnode), oldStartVnode.elm as Node);
        } else {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined as any;
          api.insertBefore(parentElm, (elmToMove.elm as Node), oldStartVnode.elm as Node);
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
  }
}

function patchVnode(vnode: VNode, oldVnode: VNode) {
  const elm = vnode.elm = (oldVnode.elm as Node)

  const oldCh = oldVnode.children
  const ch = vnode.children

  if (vnode === oldVnode) return

  // vnode is textNode
  if (isDef(vnode.text)) {
    api.setTextContent(elm, vnode.text)
  } else {
    if(isDef(oldCh) && isDef(ch)) {
      updateChildren(elm, oldCh, ch)
    }else if(isDef(oldCh)) {
      removeVnodes(elm, oldCh)
    }else if(isDef(ch)) {
      addVnodes(elm, ch)
    }else if(isDef(oldVnode.text)){
      api.setTextContent(elm, '')
    }
  }
}

export default function patch(oldVnode: any, vnode: VNode) {
  if (!isVnode(oldVnode)) {
    oldVnode = emptyNodeAt(oldVnode)
  }

  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode)
  } else {
    const parentElm = api.parentNode(oldVnode.elm)
    createElm(vnode)
    api.insertBefore(parentElm, vnode.elm, api.nextSibling(oldVnode.elm))
    api.removeChild((parentElm as Node), oldVnode.elm)
  }
}
