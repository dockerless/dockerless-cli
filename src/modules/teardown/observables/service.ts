import {concat, Observable, of} from 'rxjs'
import {mergeMap} from 'rxjs/operators'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {ContainerValue} from '@utils/types/dockerless-config'
import {TEARDOWN_FLOWS} from '@modules/teardown/flows'

import checkServiceExists from '@modules/deploy/actions/check-service-exists'

const service = new Observable<DOCKERLESS_EVENT>(subscriber => {
	subscriber.next(DOCKERLESS_EVENT.removeServiceStarted)
	subscriber.complete()
})

export default (
	cloudformationClient: CloudFormation,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	concat(
		service,
		checkServiceExists(cloudformationClient, container).pipe(
			mergeMap(
				(x: DOCKERLESS_EVENT) =>
					(TEARDOWN_FLOWS[x] && TEARDOWN_FLOWS[x](cloudformationClient, container)) || of(x)
			)
		)
	)
