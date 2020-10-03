import {Observable} from 'rxjs'
import ECR from 'aws-sdk/clients/ecr'
import CloudFormation, {CreateStackInput} from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'

import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'
import {ContainerValue} from '@utils/types/dockerless-config'

import waitForResourceRemoved from '@modules/teardown/actions/shared/wait-for-resource-removed'

const removeRepository = (
	cloudFormationClient: CloudFormation,
	ecr: ECR,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	new Observable<DOCKERLESS_EVENT>(subscriber => {
		const stackName = `dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${
			GlobalDockerlessState.stage
		}-${toId(container.containerName)}-repo`

		const clearAndRemoveRepository = async (): Promise<void> => {
			const deleteParams = {
				force: true,
				repositoryName: `${toId(GlobalDockerlessState.config.serviceName)}-${toId(container.containerName)}-${
					GlobalDockerlessState.stage
				}`
			}
			const cfParams: CreateStackInput = {
				StackName: stackName
			}

			await ecr.deleteRepository(deleteParams).promise()
			await cloudFormationClient.deleteStack(cfParams).promise()
		}

		const waitForRepositoryRemoved = (): void => {
			waitForResourceRemoved(cloudFormationClient, stackName).subscribe({
				error: e => subscriber.error(e),
				complete: () => {
					subscriber.next(DOCKERLESS_EVENT.removeServiceSuccess)
					subscriber.complete()
				}
			})
		}

		clearAndRemoveRepository()
			.then(waitForRepositoryRemoved)
			.catch(e => subscriber.error(e))
	})

export default removeRepository
