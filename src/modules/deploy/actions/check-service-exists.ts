import {Observable} from 'rxjs'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'
import {ContainerValue} from '@utils/types/dockerless-config'
import checkResourceExists from '@modules/deploy/actions/shared/check-resource-exists'

const checkServiceExists = (
	cloudFormationClient: CloudFormation,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	checkResourceExists(
		cloudFormationClient,
		`dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${toId(container.containerName)}-${
			GlobalDockerlessState.stage
		}-service`,
		DOCKERLESS_EVENT.serviceAlreadyExists,
		DOCKERLESS_EVENT.serviceDoesNotExist
	)

export default checkServiceExists
