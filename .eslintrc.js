module.exports = {
  baseConfig: {
    root: true,
    env: {
      node: true,
      browser: true
    },
    extends: [
      'eslint:recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: '@typescript-eslint/parser'
    },
    plugins: [
      '@typescript-eslint'
    ],
    rules: {
      'no-tabs': 'off',
      'semi': 'off',
      'no-useless-escape': 'off',
      'no-redeclare': 'off',
      'no-unused-vars': 'off',
      'no-control-regex': 'off',
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      'linebreak-style': [1, 'unix'],
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
  }
}
