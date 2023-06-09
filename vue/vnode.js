export function createElement(tag, attrs = {}, ...children) {
  return vnode(tag, attrs, children)
}
export function createTextVnode(text) {
  return vnode(undefined, undefined, undefined, text)
}

function vnode(tag, props, children, text) {
  return {
    tag,
    props,
    children,
    text
  }
}