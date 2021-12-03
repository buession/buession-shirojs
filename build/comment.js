const pkg = require('../package.json')
const date = new Date()

const comment = `/*!
 * Buession ${pkg.name} ${pkg.version}
 *
 * @link ${pkg.homepage}
 * @source ${pkg.repository.url}
 * @copyright @ 2020-${date.getFullYear()} ${pkg.copyright}
 * @license ${pkg.license}
 * @Build Time ${date.toUTCString()}
 */
`

module.exports = comment