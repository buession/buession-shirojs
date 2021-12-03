import fs from 'fs'
import path from 'path'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript2 from 'rollup-plugin-typescript2';
import { camelCase } from 'lodash'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import { name, alias, prototype, dependencies } from '../package.json'

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

const bannerComment = require('./comment')

const filename = alias

const externals = [...Object.keys(dependencies)]
const externalExcludes = []

const resolveConfig = {
  external: []
}
const typescript2Config = {
  tsconfigOverride: {
    exclude: ['node_modules', '**/tests/**/*', 'example', 'script'],
  },
  useTsconfigDeclarationDir: true
}
const babelConfig = {
  configFile: './babel.config.js',
  exclude: 'node_modules/**'
}

// The base rollup configuration
const baseConfig = {
  input: path.resolve(src, 'index.ts'),
  external: externals,
  plugins: [resolve(resolveConfig), commonjs(), typescript2(typescript2Config), json(), babel(babelConfig)]
}
const minifyConfig = {
  ...baseConfig,
  plugins: [resolve(resolveConfig), commonjs(), typescript2(typescript2Config), json(), terser(), babel(babelConfig)]
}

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist); 
}

export default [
  // AMD Browser Build
  {
    ...baseConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'index.ts'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'amd',
      name: camelCase(alias),
      file: path.resolve(dist, `${filename}.amd.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },
  // Minify AMD Browser Build
  {
    ...minifyConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'index.ts'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'amd',
      name: camelCase(alias),
      file: path.resolve(dist, `${filename}.amd.min.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },

  // UMD Browser Build
  {
    ...baseConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'index.ts'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'umd',
      name: prototype,
      file: path.resolve(dist, `${filename}.umd.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },
  // Minify UMD Browser Build
  {
    ...minifyConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'index.ts'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'umd',
      name: prototype,
      file: path.resolve(dist, `${filename}.umd.min.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },

  // UMD Browser Build
  {
    ...baseConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'index.ts'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'umd',
      name: prototype,
      file: path.resolve(dist, `${filename}.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },
  // Minify UMD Browser Build
  {
    ...minifyConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'index.ts'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'umd',
      name: prototype,
      file: path.resolve(dist, `${filename}.min.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },

  // ESM Module Bundle Build
  {
    ...baseConfig,
    output: {
      format: 'es',
      name: camelCase(alias),
      file: path.resolve(dist, `${filename}.esm.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },
  // Minify ESM Module Bundle Build
  {
    ...minifyConfig,
    output: {
      format: 'es',
      name: camelCase(alias),
      file: path.resolve(dist, `${filename}.esm.min.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },

  // IIFE Browser Build
  {
    ...baseConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'index.ts'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'iife',
      name: prototype,
      file: path.resolve(dist, `${filename}.iife.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },
  // Minify IIFE Browser Build
  {
    ...minifyConfig,
    // We use a specific input for the browser build
    input: path.resolve(src, 'index.ts'),
    external: externals.filter(dep => !externalExcludes.includes(dep)),
    output: {
      format: 'iife',
      name: prototype,
      file: path.resolve(dist, `${filename}.iife.min.js`),
      banner: bannerComment,
      sourcemap: true
    }
  },

  // COMMONJS Module Build
  {
    ...baseConfig,
    output: {
      format: 'cjs',
      name: camelCase(alias),
      file: path.resolve(dist, `${alias}.common.js`),
      banner: bannerComment,
      exports: 'named',
      sourcemap: true
    }
  },
  // Minify Module Module Bundle Build
  {
    ...minifyConfig,
    output: {
      format: 'cjs',
      name: camelCase(alias),
      file: path.resolve(dist, `${alias}.common.min.js`),
      banner: bannerComment,
      exports: 'named',
      sourcemap: true
    }
  },
]