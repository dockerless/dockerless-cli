import {concat, Observable, of} from 'rxjs'
import {mergeMap} from 'rxjs/operators'
import CloudFormation from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {ContainerValue} from '@utils/types/dockerless-config'
import {DEPLOY_FLOWS} from '@modules/deploy/flows'

import checkRepositoryExists from '@modules/deploy/actions/check-repository-exists'

const reposistory = new Observable<DOCKERLESS_EVENT>(subscriber => {
	subscriber.next(DOCKERLESS_EVENT.createRepositoryStarted)
	subscriber.complete()
})

export default (
	cloudformationClient: CloudFormation,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	concat(
		reposistory,
		checkRepositoryExists(cloudformationClient, container).pipe(
			mergeMap(
				(x: DOCKERLESS_EVENT) =>
					(DEPLOY_FLOWS[x] && DEPLOY_FLOWS[x](cloudformationClient, container)) || of(x)
			)
		)
	)
