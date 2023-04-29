
import { parseHtmlToAst } from "./astParser"
import { generate } from "./generate"

export function compileToRenderFunction(html) {
  // 解析html为AST树 Abstract syntax tree (抽象语法树)
  let ast = parseHtmlToAst(html),
    // ast 转换成render函数
    code = generate(ast),
    render = new Function(`
    with(this){
    return ${code}
   }`)
  return render
}
// let obj = { name: 'chang', age: 18 }
// with (obj) {
//   console.log(name, age) // chang 18
// }

