import {Observable} from 'rxjs'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'

import checkResourceExists from '@modules/deploy/actions/shared/check-resource-exists'

const checkVpcExists = (cloudFormationClient: CloudFormation): Observable<DOCKERLESS_EVENT> =>
	checkResourceExists(
		cloudFormationClient,
		`dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${GlobalDockerlessState.stage}-vpc`,
		DOCKERLESS_EVENT.vpcAlreadyExists,
		DOCKERLESS_EVENT.vpcDoesNotExist
	)

export default checkVpcExists
