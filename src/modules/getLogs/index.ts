import AWS from 'aws-sdk'
AWS.config.update({region: process.env.AWS_DEFAULT_REGION})

import {FilterLogEventsResponse} from 'aws-sdk/clients/cloudwatchlogs'
import {LogsClient} from '@utils/aws'

const prettifyRawEventLogs = (rawLogData: FilterLogEventsResponse): string[] => {
	return rawLogData.events.map(e => `[${new Date(e.timestamp).toLocaleString()}]: ${e.message}`)
}

const getLogs = async (serviceName: string, containerName: string, stage: string): Promise<void> => {
	const logGroupName = `dockerless/${serviceName}-${containerName}-${stage}`
	const rawLogData: FilterLogEventsResponse = await LogsClient.filterLogEvents({logGroupName}).promise()

	prettifyRawEventLogs(rawLogData).forEach(log => console.log(log))
}

export default getLogs
