import { visit } from 'unist-util-visit'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Remark plugin that transforms links to .sample.ts files into twoslash code blocks.
 *
 * Usage in MDX:
 * ```md
 * [](./auto-increment-keypath.sample.ts)
 * ```
 *
 * This will be replaced with a ```ts twoslash code block containing the file contents.
 */
export function remarkCodeImport() {
  return (tree, file) => {
    visit(tree, 'link', (node, index, parent) => {
      if (!node.url.endsWith('.sample.ts')) return
      if (index === undefined || !parent) return

      // Resolve the path relative to the MDX file
      const mdxDir = path.dirname(file.path)
      const filePath = path.resolve(mdxDir, node.url)

      if (!fs.existsSync(filePath))
        throw new Error(`File not found: ${filePath}`)

      let code = fs.readFileSync(filePath, 'utf-8').trim()

      // Add // ---cut--- after the imports section
      code = addCutAfterImports(code)

      // Replace the link node with a code block
      parent.children[index] = {
        type: 'code',
        lang: 'ts',
        meta: 'twoslash',
        value: code,
      }
    })
  }
}

/**
 * Adds a // ---cut--- directive after the last import statement.
 * @param {string} code
 * @returns {string}
 */
function addCutAfterImports(code) {
  const lines = code.split('\n')
  let lastImportIndex = -1

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    // Match import statements and twoslash directives (// @...)
    if (
      line.startsWith('import ') ||
      (line.startsWith('// @') && !line.startsWith('// ---'))
    ) {
      lastImportIndex = i
    } else if (line !== '' && !line.startsWith('//')) {
      // Stop at first non-import, non-comment, non-empty line
      break
    }
  }

  if (lastImportIndex !== -1) {
    // Remove any blank lines after the last import before inserting ---cut---
    let insertIndex = lastImportIndex + 1
    while (insertIndex < lines.length && lines[insertIndex].trim() === '') {
      lines.splice(insertIndex, 1)
    }
    lines.splice(insertIndex, 0, '// ---cut---')
  }

  return lines.join('\n').trim()
}
