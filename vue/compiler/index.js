
import { parseHtmlToAst } from "./astParser"

export function compileToRenderFunction(html) {
  // 解析html为AST树 Abstract syntax tree (抽象语法树)
  const ast = parseHtmlToAst(html)
}

