import {Observable} from 'rxjs'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {GlobalDockerlessState} from '@src/dockerless-state'
import {DOCKERLESS_EVENT} from '@utils/constants'
import {toId} from '@utils/string-utils'
import {ContainerValue} from '@utils/types/dockerless-config'

import checkResourceExists from '@modules/deploy/actions/shared/check-resource-exists'

const checkRepositoryExists = (
	cloudFormationClient: CloudFormation,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	checkResourceExists(
		cloudFormationClient,
		`dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${GlobalDockerlessState.stage}-${toId(
			container.containerName
		)}-repo`,
		DOCKERLESS_EVENT.repositoryAlreadyExists,
		DOCKERLESS_EVENT.repositoryDoesNotExist
	)

export default checkRepositoryExists
