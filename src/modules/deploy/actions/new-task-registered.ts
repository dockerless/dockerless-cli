import {Observable} from 'rxjs'
import ECS from 'aws-sdk/clients/ecs'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'
import {ContainerValue} from '@utils/types/dockerless-config'

const newTaskRegistered = (ecsClient: ECS, container: ContainerValue): Observable<DOCKERLESS_EVENT> =>
	new Observable(subscriber => {
		const registerNewTaskDefinition = async () => {
			const currentTask = (
				await ecsClient
					.describeTaskDefinition({
						taskDefinition: `${toId(GlobalDockerlessState.config.serviceName)}-${toId(
							container.containerName
						)}-${GlobalDockerlessState.stage}`
					})
					.promise()
			).taskDefinition

			await ecsClient
				.registerTaskDefinition({
					containerDefinitions: currentTask.containerDefinitions,
					family: currentTask.family,
					taskRoleArn: currentTask.taskRoleArn,
					executionRoleArn: currentTask.executionRoleArn,
					cpu: currentTask.cpu,
					memory: currentTask.memory,
					networkMode: currentTask.networkMode,
					volumes: currentTask.volumes,
					requiresCompatibilities: currentTask.requiresCompatibilities
				})
				.promise()

			await ecsClient
				.updateService({
					cluster: `${toId(GlobalDockerlessState.config.serviceName)}-${GlobalDockerlessState.stage}`,
					service: `${toId(GlobalDockerlessState.config.serviceName)}-${toId(container.containerName)}-${
						GlobalDockerlessState.stage
					}`,
					taskDefinition: `${toId(GlobalDockerlessState.config.serviceName)}-${toId(
						container.containerName
					)}-${GlobalDockerlessState.stage}`,
					desiredCount: container.desiredInstances
				})
				.promise()
		}

		registerNewTaskDefinition()
			.then(() => subscriber.next(DOCKERLESS_EVENT.newTaskRevisionRegisterSuccess))
			.catch(err => subscriber.error(err))
			.finally(() => subscriber.complete())
	})

export default newTaskRegistered
