import {Observable} from 'rxjs'
import CloudFormation, {CreateStackInput} from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT, REPOSITORY_YML} from '@utils/constants'

import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'
import {ContainerValue} from '@utils/types/dockerless-config'

import createCFResource from '@modules/deploy/actions/shared/create-cf-resource'

const createRepository = (
	cloudFormationClient: CloudFormation,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> => {
	const cfParams: CreateStackInput = {
		StackName: `dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${
			GlobalDockerlessState.stage
		}-${toId(container.containerName)}-repo`,
		TemplateBody: REPOSITORY_YML,
		Parameters: [
			{
				ParameterKey: 'RepositoryName',
				ParameterValue: `${toId(GlobalDockerlessState.config.serviceName)}-${toId(container.containerName)}-${
					GlobalDockerlessState.stage
				}`
			}
		],
		Capabilities: ['CAPABILITY_NAMED_IAM']
	}

	return createCFResource(cloudFormationClient, cfParams, DOCKERLESS_EVENT.createRepositorySuccess)
}

export default createRepository
