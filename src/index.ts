import AWS from 'aws-sdk'
import arg from 'arg'

AWS.config.update({region: process.env.AWS_DEFAULT_REGION})

import {GlobalDockerlessState} from '@src/dockerless-state'
import {ContainerValue} from '@utils/types/dockerless-config'
import {CliOptions} from '@utils/types'
import DockerlessStage, {DockerlessStageKey} from '@utils/types/stage-enum'

import {toId} from '@utils/string-utils'

import {getDeployTasks} from '@modules/deploy/tasks'
import {getTeardownTasks} from '@modules/teardown/tasks'
import getLogs from '@modules/getLogs'

const allContainers: ContainerValue[] = Object.values(GlobalDockerlessState.config.containers)

const parseArgumentsIntoOptions = (rawArgs: string[]): CliOptions => {
	const args = arg(
		{
			'--stage': String,
			'--container': String,
			'-s': '--stage',
			'-c': '--container'
		},
		{
			argv: rawArgs.slice(2)
		}
	)
	return {
		stage: DockerlessStage[args['--stage'] as DockerlessStageKey] || DockerlessStage.dev,
		container: args['--container'] || allContainers[0].containerName
	}
}

const helpCommandLines = [
	`Dockerless CLI:`,
	`* dockerless deploy - Deploy the service configured in dockerless.yml to AWS`,
	`* dockerless remove - Remove the already deployed service configured in dockerless.yml from AWS`,
	`* dockerless logs -c "CONTAINER_NAME" - Get the logs of a specific container`,
	`\nAll commands can take a '-s' option to specify a specfic stage. Default stage is "dev".`,
	`Official CLI docs at https://dockerless.io/docs/cli`
]

export const cli = (args: string[]): void => {
	const command = args.slice(2)[0]
	const options = parseArgumentsIntoOptions(args)

	if (options.stage) {
		GlobalDockerlessState.stage = options.stage
	}

	switch (command) {
		case 'deploy':
			getDeployTasks(allContainers)
				.run()
				.catch((err: Error) => {
					console.error(err)
				})
			break
		case 'remove':
		case 'delete':
		case 'teardown':
			getTeardownTasks(allContainers)
				.run()
				.catch((err: Error) => {
					console.error(err)
				})
			break
		case 'logs':
			console.log(`Logs for container "${options.container}" on stage ${options.stage}`)
			getLogs(
				toId(GlobalDockerlessState.config.serviceName),
				toId(options.container),
				options.stage
			).catch(e => console.log(`Error while getting logs: ${e.message}`))
			break
		default:
			console.log(helpCommandLines.join('\n'))
	}
}
