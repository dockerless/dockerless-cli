import Listr from 'listr'

import {ContainerValue} from '@utils/types/dockerless-config'
import {CloudFormationClient, ECRClient} from '@utils/aws'
import {createTask} from '@utils/create-task'

import removeService from '@modules/teardown/observables/service'
import removeRepository from '@modules/teardown/observables/repository'
import removeCluster from '@modules/teardown/observables/cluster'
import removeVpc from '@modules/teardown/observables/vpc'

export const getTeardownTasks = (containers: ContainerValue[]): Listr => {
	const containerRemoveTasks = new Listr(
		containers.map(container => ({
			title: container.containerName,
			task: (): Listr =>
				new Listr([
					{
						title: 'Remove service',
						task: createTask(removeService, CloudFormationClient, container)
					},
					{
						title: 'Remove repository',
						task: createTask(removeRepository, CloudFormationClient, ECRClient, container)
					}
				])
		}))
	)

	return new Listr([
		{
			title: 'Teardown of containers',
			task: (): Listr => containerRemoveTasks
		},
		{
			title: 'Remove cluster',
			task: createTask(removeCluster, CloudFormationClient)
		},
		{
			title: 'Remove VPC',
			task: createTask(removeVpc, CloudFormationClient)
		}
	])
}
