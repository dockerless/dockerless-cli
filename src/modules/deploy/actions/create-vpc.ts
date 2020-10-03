import {Observable} from 'rxjs'
import CloudFormation, {CreateStackInput} from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT, VPC_YML} from '@utils/constants'
import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'

import createCFResource from '@modules/deploy/actions/shared/create-cf-resource'

const createVpc = (cloudFormationClient: CloudFormation): Observable<DOCKERLESS_EVENT> => {
	const cfParams: CreateStackInput = {
		StackName: `dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${
			GlobalDockerlessState.stage
		}-vpc`,
		TemplateBody: VPC_YML,
		Parameters: [
			{
				ParameterKey: 'EnvironmentNameParam',
				ParameterValue: GlobalDockerlessState.stage
			},
			{
				ParameterKey: 'BaseNameParam',
				ParameterValue: GlobalDockerlessState.config.serviceName
			},
			{
				ParameterKey: 'NATType',
				ParameterValue: 'EC2 NAT Instance'
			}
		],
		Capabilities: ['CAPABILITY_NAMED_IAM']
	}

	return createCFResource(cloudFormationClient, cfParams, DOCKERLESS_EVENT.createVpcSuccess)
}

export default createVpc
