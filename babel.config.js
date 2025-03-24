module.exports = {
  presets: [
    ['@babel/preset-env']
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: false
      }
    ],
    '@babel/plugin-transform-optional-chaining',
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-object-rest-spread',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-transform-export-namespace-from',
    '@babel/plugin-transform-class-properties',
    [
      '@babel/plugin-transform-runtime',
      {
        useESModules: true
      }
    ]
  ]
}