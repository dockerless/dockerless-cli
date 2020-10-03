import Listr from 'listr'

import {ContainerValue} from '@utils/types/dockerless-config'
import {CloudFormationClient, ECSClient, STSClient} from '@utils/aws'
import {createTask} from '@utils/create-task'

import deploySharedResources from '@modules/deploy/observables/shared-resources'
import deployVpc from '@modules/deploy/observables/vpc'
import deployCluster from '@modules/deploy/observables/cluster'
import deployRepository from '@modules/deploy/observables/repository'
import deployImage from '@modules/deploy/observables/image'
import deployService from '@modules/deploy/observables/service'
import deployTaskDefinition from '@modules/deploy/observables/task-definition'

export const getDeployTasks = (containers: ContainerValue[]): Listr => {
	const containerDeployTasks = new Listr(
		containers.map(container => ({
			title: container.containerName,
			task: (): Listr =>
				new Listr([
					{
						title: 'Create repository',
						task: createTask(deployRepository, CloudFormationClient, container)
					},
					{
						title: 'Push image',
						task: createTask(deployImage, STSClient, container)
					},
					{
						title: 'Create service',
						task: createTask(deployService, CloudFormationClient, STSClient, container)
					},
					{
						title: 'Register task definition',
						task: createTask(deployTaskDefinition, ECSClient, container)
					}
				])
		}))
	)

	return new Listr([
		{
			title: 'Dockerless Environment',
			task: (): Listr =>
				new Listr(
					[
						{
							title: 'Create Shared resources',
							task: createTask(deploySharedResources, CloudFormationClient)
						},
						{
							title: 'Create VPC',
							task: createTask(deployVpc, CloudFormationClient)
						}
					],
					{concurrent: true}
				)
		},
		{
			title: 'Create cluster',
			task: createTask(deployCluster, CloudFormationClient)
		},
		{
			title: 'Creation of containers',
			task: (): Listr => containerDeployTasks
		}
	])
}
