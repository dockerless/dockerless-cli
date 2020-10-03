import {Observable} from 'rxjs'
import CloudFormation, {CreateStackInput} from 'aws-sdk/clients/cloudformation'
import STS from 'aws-sdk/clients/sts'

import {DOCKERLESS_EVENT, SERVICE_YML} from '@utils/constants'

import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'
import {ContainerValue} from '@utils/types/dockerless-config'

import waitForResourceCreated from '@modules/deploy/actions/shared/wait-for-resource-created'

const createService = (
	cloudFormationClient: CloudFormation,
	stsClient: STS,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	new Observable<DOCKERLESS_EVENT>(subscriber => {
		const stackName = `dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${toId(
			container.containerName
		)}-${GlobalDockerlessState.stage}-service`

		const createService = async () => {
			const localImageTagName = `${toId(GlobalDockerlessState.config.serviceName)}-${toId(
				container.containerName
			)}-${GlobalDockerlessState.stage}`
			const awsAccountId = (await stsClient.getCallerIdentity().promise()).Account
			const remoteImageTagName = `${awsAccountId}.dkr.ecr.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${localImageTagName}:latest`

			const cfParams: CreateStackInput = {
				StackName: stackName,
				TemplateBody: SERVICE_YML,
				Parameters: [
					{
						ParameterKey: 'VPCStackName',
						ParameterValue: `dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${
							GlobalDockerlessState.stage
						}-vpc`
					},
					{
						ParameterKey: 'SharedResourcesStackName',
						ParameterValue: 'dockerless-shared-resources'
					},
					{
						ParameterKey: 'ClusterStackName',
						ParameterValue: `dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${
							GlobalDockerlessState.stage
						}-cluster`
					},
					{
						ParameterKey: 'ImageUrl',
						ParameterValue: remoteImageTagName
					},
					{
						ParameterKey: 'ServiceName',
						ParameterValue: `${toId(GlobalDockerlessState.config.serviceName)}-${toId(
							container.containerName
						)}-${GlobalDockerlessState.stage}`
					},
					{
						ParameterKey: 'ContainerSize',
						ParameterValue: container.size
					},
					{
						ParameterKey: 'ContainerPort',
						ParameterValue: container.port.toString()
					},
					{
						ParameterKey: 'DesiredCount',
						ParameterValue: container.desiredInstances.toString()
					},
					{
						ParameterKey: 'DesiredCount',
						ParameterValue: container.desiredInstances.toString()
					},
					{
						ParameterKey: 'NetworkType',
						ParameterValue: container.networkType || 'public'
					},
					{
						ParameterKey: 'Protocol',
						ParameterValue: container.portProtocol
					},
					{
						ParameterKey: 'LoadBalancerType',
						ParameterValue: container.portProtocol === 'HTTP' ? 'application' : 'network'
					}
				],
				Capabilities: ['CAPABILITY_NAMED_IAM']
			}

			await cloudFormationClient.createStack(cfParams).promise()
		}

		const waitForServiceCreated = (): void => {
			waitForResourceCreated(cloudFormationClient, stackName).subscribe({
				error: e => subscriber.error(e),
				complete: () => {
					subscriber.next(DOCKERLESS_EVENT.createServiceSuccess)
					subscriber.complete()
				}
			})
		}

		createService()
			.then(waitForServiceCreated)
			.catch(e => subscriber.error(e))
	})

export default createService
