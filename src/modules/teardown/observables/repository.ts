import {concat, Observable, of} from 'rxjs'
import {mergeMap} from 'rxjs/operators'
import CloudFormation from 'aws-sdk/clients/cloudformation'
import ECR from 'aws-sdk/clients/ecr'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {ContainerValue} from '@utils/types/dockerless-config'
import {TEARDOWN_FLOWS} from '@modules/teardown/flows'

import checkRepositoryExists from '@modules/deploy/actions/check-repository-exists'

const repository = new Observable<DOCKERLESS_EVENT>(subscriber => {
	subscriber.next(DOCKERLESS_EVENT.removeRepositoryStarted)
	subscriber.complete()
})

export default (
	cloudformationClient: CloudFormation,
	ecr: ECR,
	container: ContainerValue
): Observable<DOCKERLESS_EVENT> =>
	concat(
		repository,
		checkRepositoryExists(cloudformationClient, container).pipe(
			mergeMap(
				(x: DOCKERLESS_EVENT) =>
					(TEARDOWN_FLOWS[x] && TEARDOWN_FLOWS[x](cloudformationClient, ecr, container)) || of(x)
			)
		)
	)
