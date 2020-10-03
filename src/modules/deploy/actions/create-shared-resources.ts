import {Observable} from 'rxjs'
import CloudFormation, {CreateStackInput} from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT, SHARED_RESOURCES_YML} from '@utils/constants'

import createCFResource from '@modules/deploy/actions/shared/create-cf-resource'

const createSharedResources = (cloudFormationClient: CloudFormation): Observable<DOCKERLESS_EVENT> => {
	const cfParams: CreateStackInput = {
		StackName: 'dockerless-shared-resources',
		TemplateBody: SHARED_RESOURCES_YML,
		Capabilities: ['CAPABILITY_NAMED_IAM']
	}

	return createCFResource(cloudFormationClient, cfParams, DOCKERLESS_EVENT.createSharedResourcesSuccess)
}

export default createSharedResources
