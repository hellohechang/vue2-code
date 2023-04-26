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



export function parseHtmlToAst(html) {

  while (html) {
    let textEnd = html.indexOf('<')

    if (textEnd === 0) {
      const startTagMatch = parseStartTag()

      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }

    }
    break
  }

  // 解析标签头 <div aa="xx"/>
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
    console.log('-------开始---------')
    console.log(tagName, attrs)
  }

  function end(tagName) {
    console.log('-------结束---------')
    console.log(tagName)
  }

  function chars(text) {
    console.log('-------文本---------')
    console.log(text)
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
}