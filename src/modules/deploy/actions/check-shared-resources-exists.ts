import {Observable} from 'rxjs'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'

import checkResourceExists from '@modules/deploy/actions/shared/check-resource-exists'

const checkSharedResourcesExist = (cloudFormationClient: CloudFormation): Observable<DOCKERLESS_EVENT> =>
	checkResourceExists(
		cloudFormationClient,
		'dockerless-shared-resources',
		DOCKERLESS_EVENT.sharedResourcesAlreadyExists,
		DOCKERLESS_EVENT.sharedResourcesDoesNotExist
	)

export default checkSharedResourcesExist
