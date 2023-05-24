import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import colors from '@nyxb/picocolors'
import { rewriteImports, walkDir } from './util'
import consolji from 'consolji'

const dir = dirname(fileURLToPath(import.meta.url))
const nodeDts = resolve(dir, '../dist/node/index.d.ts')

// rewrite `types/*` import to relative import
rewriteImports(nodeDts, (importPath) => {
  if (importPath.startsWith('types/')) {
    return '../../' + importPath
  }
})

consolji.log(colors.nicegreen(colors.bold(`patched types/* imports`)))

// remove picomatch type import because only the internal property uses it
const picomatchImport = "import type { Matcher as Matcher_2 } from 'picomatch';"

walkDir(nodeDts, (file) => {
  const content = fs.readFileSync(file, 'utf-8')
  if (!content.includes(picomatchImport)) {
    throw new Error(`Should find picomatch type import in ${file}`)
  }

  const replacedContent = content.replace(picomatchImport, '')
  fs.writeFileSync(file, replacedContent, 'utf-8')
})

consolji.log(colors.nicegreen(colors.bold(`removed picomatch type import`)))