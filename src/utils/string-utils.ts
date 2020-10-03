export const toId = (text: string | number): string => {
	if (typeof text !== 'string' && typeof text !== 'number') {
		return ''
	}

	return String(text)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '')
}

export const getStackNameFromCloudformationARN = (cloudformationArn: string): string =>
	cloudformationArn.split('/')[1]
