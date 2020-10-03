import {concat, Observable, of} from 'rxjs'
import {mergeMap} from 'rxjs/operators'
import CloudFormation from 'aws-sdk/clients/cloudformation'
import STS from 'aws-sdk/clients/sts'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {ContainerValue} from '@utils/types/dockerless-config'
import {DEPLOY_FLOWS} from '@modules/deploy/flows'

import checkServiceExists from '@modules/deploy/actions/check-service-exists'

const service = new Observable<DOCKERLESS_EVENT>(subscriber => {
	subscriber.next(DOCKERLESS_EVENT.createServiceStarted)
	subscriber.complete()
})

export default (
	cloudformationClient: CloudFormation,
	stsClient: STS,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	concat(
		service,
		checkServiceExists(cloudformationClient, container).pipe(
			mergeMap(
				(x: DOCKERLESS_EVENT) =>
					(DEPLOY_FLOWS[x] && DEPLOY_FLOWS[x](cloudformationClient, stsClient, container)) || of(x)
			)
		)
	)
