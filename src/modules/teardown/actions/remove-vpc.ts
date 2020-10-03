import {Observable} from 'rxjs'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'

import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'

import removeCFResource from '@modules/teardown/actions/shared/remove-cf-resource'

const removeVpc = (cloudFormationClient: CloudFormation): Observable<DOCKERLESS_EVENT> =>
	removeCFResource(
		cloudFormationClient,
		`dockerless-${toId(GlobalDockerlessState.config.serviceName)}-${GlobalDockerlessState.stage}-vpc`,
		DOCKERLESS_EVENT.removeVpcSuccess
	)

export default removeVpc
