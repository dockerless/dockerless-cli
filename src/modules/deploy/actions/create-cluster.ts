import {Observable} from 'rxjs'
import CloudFormation, {CreateStackInput} from 'aws-sdk/clients/cloudformation'

import {CLUSTER_YML, DOCKERLESS_EVENT} from '@utils/constants'

import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'

import createCFResource from '@modules/deploy/actions/shared/create-cf-resource'

const createCluster = (cloudFormationClient: CloudFormation): Observable<DOCKERLESS_EVENT> => {
	const cfParams: CreateStackInput = {
		StackName: `dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${
			GlobalDockerlessState.stage
		}-cluster`,
		TemplateBody: CLUSTER_YML,
		Parameters: [
			{
				ParameterKey: 'ClusterName',
				ParameterValue: toId(GlobalDockerlessState.config.serviceName)
			},
			{
				ParameterKey: 'NetworkName',
				ParameterValue: toId(GlobalDockerlessState.config.serviceName)
			},
			{
				ParameterKey: 'EnvironmentNameParam',
				ParameterValue: GlobalDockerlessState.stage
			},
			{
				ParameterKey: 'VPCStackName',
				ParameterValue: `dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${
					GlobalDockerlessState.stage
				}-vpc`
			}
		],
		Capabilities: ['CAPABILITY_NAMED_IAM']
	}

	return createCFResource(cloudFormationClient, cfParams, DOCKERLESS_EVENT.createVpcSuccess)
}

export default createCluster
