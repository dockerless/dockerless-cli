import {concat, Observable, of} from 'rxjs'
import {mergeMap} from 'rxjs/operators'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {DEPLOY_FLOWS} from '@modules/deploy/flows'

import checkSharedResourcesExist from '@modules/deploy/actions/check-shared-resources-exists'

const sharedResources = new Observable<DOCKERLESS_EVENT>(subscriber => {
	subscriber.next(DOCKERLESS_EVENT.createSharedResourcesStarted)
	subscriber.complete()
})

export default (cloudformationClient: CloudFormation): Observable<DOCKERLESS_EVENT> =>
	concat(
		sharedResources,
		checkSharedResourcesExist(cloudformationClient).pipe(
			mergeMap((x: DOCKERLESS_EVENT) => (DEPLOY_FLOWS[x] && DEPLOY_FLOWS[x](cloudformationClient)) || of(x))
		)
	)
