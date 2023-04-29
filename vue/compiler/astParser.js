// id="app" id='app' id=app
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// <my-header></my-header>
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
// <my:header></my:header>
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// <div
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// > />
const startTagClose = /^\s*(\/?)>/;
// </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

//<div id="app" style="color: red;font-size: 20px;">
//  hello,{{name}}
//  <span class="text" style="color: blue;">
//  {{age}}
//  </span>
//</div>
export function parseHtmlToAst(html) {
  let text,
    root,
    currentParent,
    stack = [];

  while (html) {
    let textEnd = html.indexOf('<')
    // < 开头
    if (textEnd === 0) {
      // <div id="app" style="color: red;font-size: 20px;">
      const startTagMatch = parseStartTag()
      // {
      //   tagName:'div',
      //   attrs:[{ name: 'id', value: 'app' }, {name: 'style', value: 'color: red;font-size: 20px;'}]
      // }
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue;
      }

      // 匹配 </div>
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end()
        continue;
      }
    }

    if (textEnd > 0) {
      text = html.slice(0, textEnd)
    }

    if (text) {
      advance(text.length)
      chars(text)
    }
  }

  // 解析标签头 <div aa="xx">
  function parseStartTag() {
    // <div
    const start = html.match(startTagOpen)

    let end,
      attr;

    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }

      advance(start[0].length)
      // 剩下的字符不是> />,匹配到aa="xx"
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name: attr[1],
          // 属性值可能是双引号可能是单引号可能没有引号三种情况
          value: attr[3] || attr[4] || attr[5]
        })
        advance(attr[0].length)
      }

      // 匹配到结束 > />
      if (end) {
        advance(end[0].length)
      }
      return match
    }
  }

  // 删除已经处理的字符
  function advance(n) {
    html = html.substring(n)
  }

  function start(tagName, attrs) {
    const element = createASTElement(tagName, attrs)
    // {
    //   tag: 'div',
    //   type: 1,
    //   children: [],
    //   attrs:[{ name: 'id', value: 'app' }, {name: 'style', value: 'color: red;font-size: 20px;'}],
    //   parent
    // }
    if (!root) {
      root = element
    }

    currentParent = element
    stack.push(element)
  }
  // stack['div','span']
  function end() {
    const element = stack.pop() // ['span']
    currentParent = stack[stack.length - 1]// ['div']

    if (currentParent) {
      element.parent = currentParent
      currentParent.children.push(element)
    }
  }

  function chars(text) {
    text = text.trim()

    if (text.length > 0) {
      currentParent.children.push({
        type: 3,
        text
      })
    }
  }

  function createASTElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      attrs,
      parent
    }
  }
  return root;
}