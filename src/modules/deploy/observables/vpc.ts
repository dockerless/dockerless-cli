import {concat, Observable, of} from 'rxjs'
import {mergeMap} from 'rxjs/operators'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {DEPLOY_FLOWS} from '@modules/deploy/flows'

import checkVpcExists from '@modules/deploy/actions/check-vpc-exists'

const vpc = new Observable<DOCKERLESS_EVENT>(subscriber => {
	subscriber.next(DOCKERLESS_EVENT.createVpcStarted)
	subscriber.complete()
})

export default (cloudformationClient: CloudFormation): Observable<DOCKERLESS_EVENT> =>
	concat(
		vpc,
		checkVpcExists(cloudformationClient).pipe(
			mergeMap((x: DOCKERLESS_EVENT) => (DEPLOY_FLOWS[x] && DEPLOY_FLOWS[x](cloudformationClient)) || of(x))
		)
	)
