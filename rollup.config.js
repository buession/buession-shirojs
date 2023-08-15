import fs from 'fs'
import path from 'path'
import babel from '@rollup/plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import typescript2 from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import { camelCase } from 'lodash'

const pkg = require('./package.json');
const base = path.resolve(__dirname, '.');
const src = path.resolve(base, 'src');
const dist = path.resolve(base, 'dist');

const date = new Date();

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

const filename = pkg.alias;

const externals = ['window'];
const externalExcludes = [];

const plugins = [
  eslint(),
  resolve({
    external: []
  }),
  commonjs(),
  typescript2({
    tsconfig: './tsconfig.json'
  }),
  replace({
    preventAssignment: true,
    values: {
      __VERSION__: pkg.version
    }
  }), 
  babel({
    configFile: './babel.config.js',
    babelHelpers: 'runtime',
    exclude: 'node_modules/**'
  })
];

// The base rollup configuration
const baseConfig = {
  input: path.resolve(src, 'index.ts'),
  external: externals.filter(dep => !externalExcludes.includes(dep)),
  plugins: plugins
};
const minifyConfig = {
  ...baseConfig,
  plugins: [...plugins, terser()]
};

const outputConfig = {
  name: camelCase(pkg.alias),
  exports: 'named',
  banner: bannerComment,
  sourcemap: true
};

// Ensure dist directory exists
if (!fs.existsSync(dist)) {
  fs.mkdirSync(dist); 
}

export default [
  // AMD Browser Build
  {
    ...baseConfig,
    output: {
      ...outputConfig,
      format: 'amd',
      file: path.resolve(dist, `${filename}.amd.js`)
    }
  },
  // Minify AMD Browser Build
  {
    ...minifyConfig,
    output: {
      ...outputConfig,
      format: 'amd',
      file: path.resolve(dist, `${filename}.amd.min.js`)
    }
  },

  // UMD Browser Build
  {
    ...baseConfig,
    output: {
      ...outputConfig,
      format: 'umd',
      file: path.resolve(dist, `${filename}.umd.js`)
    }
  },
  // Minify UMD Browser Build
  {
    ...minifyConfig,
    output: {
      ...outputConfig,
      format: 'umd',
      file: path.resolve(dist, `${filename}.umd.min.js`)
    }
  },

  // UMD Browser Build
  {
    ...baseConfig,
    output: {
      ...outputConfig,
      format: 'umd',
      file: path.resolve(dist, `${filename}.js`)
    }
  },
  // Minify UMD Browser Build
  {
    ...minifyConfig,
    output: {
      ...outputConfig,
      format: 'umd',
      file: path.resolve(dist, `${filename}.min.js`)
    }
  },

  // ESM Module Bundle Build
  {
    ...baseConfig,
    output: {
      ...outputConfig,
      format: 'esm',
      file: path.resolve(dist, `${filename}.esm.js`)
    }
  },
  // Minify ESM Module Bundle Build
  {
    ...minifyConfig,
    output: {
      ...outputConfig,
      format: 'esm',
      file: path.resolve(dist, `${filename}.esm.min.js`)
    }
  },

  // IIFE Browser Build
  {
    ...baseConfig,
    output: {
      ...outputConfig,
      format: 'iife',
      file: path.resolve(dist, `${filename}.iife.js`)
    }
  },
  // Minify IIFE Browser Build
  {
    ...minifyConfig,
    output: {
      ...outputConfig,
      format: 'iife',
      file: path.resolve(dist, `${filename}.iife.min.js`)
    }
  },

  // COMMONJS Module Build
  {
    ...baseConfig,
    output: {
      ...outputConfig,
      format: 'cjs',
      file: path.resolve(dist, `${filename}.cjs.js`)
    }
  },
  // Minify COMMONJS Module Bundle Build
  {
    ...minifyConfig,
    output: {
      ...outputConfig,
      format: 'cjs',
      file: path.resolve(dist, `${filename}.cjs.min.js`)
    }
  }
]