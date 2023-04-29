export function patch(oldNode, vNode) {
  let el = createElement(vNode),
    parentElement = oldNode.parentNode;
  parentElement.insertBefore(el, oldNode.nextSibling)
  parentElement.removeChild(oldNode)
}

function createElement(vnode) {
  const { tag, props, children, text } = vnode;

  if (typeof tag === 'string') {
    vnode.el = document.createElement(tag)
    updateProps(vnode)
    children.forEach((child) => {
      vnode.el.appendChild(createElement(child))
    })
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

function updateProps(vnode) {
  const el = vnode.el,
    newProps = vnode.props || {};
  Object.keys(newProps).forEach((key) => {
    if (key === 'style') {
      Object.keys(newProps[key]).forEach((skey) => {
        el[key][skey] = newProps[key][skey]
      })
    } else if (key === 'class') {
      el.className = newProps[key]
    } else {
      el.setAttribute(key, newProps[key])
    }
  })
}