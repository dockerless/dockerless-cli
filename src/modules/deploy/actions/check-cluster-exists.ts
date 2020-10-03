import {Observable} from 'rxjs'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {GlobalDockerlessState} from '@src/dockerless-state'
import {DOCKERLESS_EVENT} from '@utils/constants'
import {toId} from '@utils/string-utils'

import checkResourceExists from '@modules/deploy/actions/shared/check-resource-exists'

const checkClusterExists = (cloudFormationClient: CloudFormation): Observable<DOCKERLESS_EVENT> =>
	checkResourceExists(
		cloudFormationClient,
		`dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${GlobalDockerlessState.stage}-cluster`,
		DOCKERLESS_EVENT.clusterAlreadyExists,
		DOCKERLESS_EVENT.clusterDoesNotExist
	)

export default checkClusterExists
