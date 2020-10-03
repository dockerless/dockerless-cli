import {Observable} from 'rxjs'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'

import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'
import {ContainerValue} from '@utils/types/dockerless-config'

import removeCFResource from '@modules/teardown/actions/shared/remove-cf-resource'

const removeService = (
	cloudFormationClient: CloudFormation,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	removeCFResource(
		cloudFormationClient,
		`dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${toId(container.containerName)}-${
			GlobalDockerlessState.stage
		}-service`,
		DOCKERLESS_EVENT.removeServiceSuccess
	)

export default removeService
