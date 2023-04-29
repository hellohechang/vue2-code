
//<div id="app" style="color: red;font-size: 20px;">
//   hello,{{name}}
//   <span class="text" style="color: blue;">{{age}}</span>
//  </div>

// function render() {
//   return `
//   _c(
//     "div",
//     {
//       "id": "app",
//       "style": {
//         "color": "red",
//         "font-size": "20px"
//       }
//     },
//     _v("hello, " + _s(name)),
//     _c(
//       "span",
//       {
//         "class":"text",
//         "style":{
//           "color":"blue"
//         }
//       },
//       _v(_s(age))
//     )
//   )`
// }

// 匹配 {{}}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g



export function generate(el) {
  let children = getChildren(el)
  let code = `_c('${el.tag}',
    ${el.attrs.length > 0 ? `${formarProps(el.attrs)}` : 'undefined'}
    ${children ? `,${children}` : ''})`
  return code
}
function generateChild(node) {
  if (node.type === 1) {
    // 处理元素
    return generate(node)
  } else if (node.type === 3) {
    // 处理文本节点
    let text = node.text

    // 不包含{{}}
    if (!defaultTagRE.test(text)) {
      return `_v(${JSON.stringify(text)})`
    }

    let match,
      index,
      // defaultTagRE在上面已经匹配过一次,重置lastIndex
      lastIndex = defaultTagRE.lastIndex = 0,
      textArr = [];

    while (match = defaultTagRE.exec(text)) {
      index = match.index
      if (index > lastIndex) {
        textArr.push(JSON.stringify(text.slice(lastIndex, index)))
      }
      textArr.push(`_s(${match[1].trim()})`)
      lastIndex = index + match[0].length
    }

    if (lastIndex < text.length) {
      textArr.push(JSON.stringify(text.slice(lastIndex)))
    }
    return `_v(${textArr.join("+")})`
  }
}

function getChildren(el) {
  const children = el.children

  if (children) {
    return children.map((c) => generateChild(c)).join(',')
  }
}

// 处理属性格式
function formarProps(attrs) {
  let attrStr = ''

  attrs.forEach((attr) => {
    if (attr.name === 'style') {
      let styleAttrs = {}
      // 样式转换为对象
      attr.value.split(';').forEach((styleAttr) => {
        let [key, value] = styleAttr.split(':')
        styleAttrs[key] = value
      })

      attr.value = styleAttrs
    }
    attrStr += `${attr.name}:${JSON.stringify(attr.value)},`
  })
  return `{${attrStr.slice(0, -1)}}`
  // {id:"app",style:{"color":" red","font-size":" 20px"}}
}