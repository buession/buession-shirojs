'use strict';

const fs = require('fs');
const { getProjectPath } = require('./utils/projectHelper');

module.exports = function (types) {
  const tsconfigFile = getProjectPath(types ? 'tsconfig.types.json' : 'tsconfig.json');
  let my = {};
  if (fs.existsSync(tsconfigFile)) {
    my = require(tsconfigFile);
  }
  return Object.assign(
    {
    },
    my.compilerOptions
  );
};