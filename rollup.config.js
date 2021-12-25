import fs from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript2 from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import { camelCase } from 'lodash';

const pkg = require('./package.json');
const base = path.resolve(__dirname, '.')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

const date = new Date()

const bannerComment = `/*!
 * Buession ${pkg.alias} ${pkg.version}
 *
 * @link ${pkg.homepage}
 * @source ${pkg.repository.url}
 * @copyright @ 2020-${date.getFullYear()} ${pkg.copyright}
 * @license ${pkg.license}
 * @Build Time ${date.toUTCString()}
 */
`

const filename = pkg.alias

const externals = ['window']
const externalExcludes = []

const resolveConfig = {
  external: []
}
const typescript2Config = {
  useTsconfigDeclarationDir: true
}
const babelConfig = {
  configFile: './babel.config.js',
  runtimeHelpers: true,
  exclude: 'node_modules/**'
}
const replaceConfig = {
  preventAssignment: true,
  values: {
    __VERSION__: pkg.version
  }
}

// The base rollup configuration
const baseConfig = {
  input: path.resolve(src, 'index.ts'),
  external: externals,
  plugins: [resolve(resolveConfig), commonjs(), typescript2(typescript2Config), replace(replaceConfig), babel(babelConfig)]
}
const minifyConfig = {
  ...baseConfig,
  plugins: [resolve(resolveConfig), commonjs(), typescript2(typescript2Config), replace(replaceConfig), terser(), babel(babelConfig)]
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
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.amd.js`),
      banner: bannerComment,
      exports: 'named',
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
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.amd.min.js`),
      banner: bannerComment,
      exports: 'named',
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
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.umd.js`),
      banner: bannerComment,
      exports: 'named',
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
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.umd.min.js`),
      banner: bannerComment,
      exports: 'named',
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
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.js`),
      banner: bannerComment,
      exports: 'named',
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
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.min.js`),
      banner: bannerComment,
      exports: 'named',
      sourcemap: true
    }
  },

  // ESM Module Bundle Build
  {
    ...baseConfig,
    output: {
      format: 'esm',
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.esm.js`),
      banner: bannerComment,
      exports: 'named',
      sourcemap: true
    }
  },
  // Minify ESM Module Bundle Build
  {
    ...minifyConfig,
    output: {
      format: 'esm',
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.esm.min.js`),
      banner: bannerComment,
      exports: 'named',
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
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.iife.js`),
      banner: bannerComment,
      exports: 'named',
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
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.iife.min.js`),
      banner: bannerComment,
      exports: 'named',
      sourcemap: true
    }
  },

  // COMMONJS Module Build
  {
    ...baseConfig,
    output: {
      format: 'cjs',
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.cjs.js`),
      banner: bannerComment,
      exports: 'named',
      sourcemap: true
    }
  },
  // Minify COMMONJS Module Bundle Build
  {
    ...minifyConfig,
    output: {
      format: 'cjs',
      name: camelCase(pkg.alias),
      file: path.resolve(dist, `${filename}.cjs.min.js`),
      banner: bannerComment,
      exports: 'named',
      sourcemap: true
    }
  }
]