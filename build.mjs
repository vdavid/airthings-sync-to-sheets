import { copyFileSync, mkdirSync } from 'node:fs'
import * as esbuild from 'esbuild'
import { GasPlugin } from 'esbuild-gas-plugin'

// Bundle the namespace files reachable from Code.ts into one IIFE. GasPlugin prepends `var global = this`
// plus top-level stubs for each `global.x = fn` in the entry, so Apps Script lists and runs them.
await esbuild.build({
    entryPoints: ['Code.ts'],
    bundle: true,
    outfile: 'dist/Code.js',
    format: 'iife',
    target: 'es2019',
    platform: 'neutral',
    plugins: [GasPlugin],
})

mkdirSync('dist', { recursive: true })
copyFileSync('appsscript.json', 'dist/appsscript.json')

console.log('Built dist/Code.js and copied dist/appsscript.json')
