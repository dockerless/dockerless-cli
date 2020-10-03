/**
 * Webpack loader to return YAML files as base64 string
 * Used for CloudFormation files
 * @param source
 * @returns {string}
 */
module.exports = function loader(source) {
	const parsed = Buffer.from(source, 'utf-8').toString('base64')

	return `export default {value: \`${parsed}\`}`
}
