const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '..', 'src', 'app', '(payload)', 'admin', 'importMap.js')
if (!fs.existsSync(file)) process.exit(0)

let src = fs.readFileSync(file, 'utf8')

// If the file already has an annotation, do nothing
if (src.includes('@ts-nocheck') || src.includes('/** @type {Record<string,')) {
  process.exit(0)
}

// Insert @ts-nocheck at the top and a JSDoc annotation before export
const withNoCheck = `/* @ts-nocheck */\n` + src

// Add JSDoc before the first export const importMap
const annotated = withNoCheck.replace(
  /(^|\n)(\s*)export const importMap = \{/,
  (_m, p1, indent) => `${p1}${indent}/** @type {Record<string, unknown>} */\n${indent}export const importMap = {`,
)

fs.writeFileSync(file, annotated, 'utf8')
