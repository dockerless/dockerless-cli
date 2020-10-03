import CloudFormation, {CreateStackInput} from 'aws-sdk/clients/cloudformation'
import {Observable} from 'rxjs'
import {DOCKERLESS_EVENT} from '@utils/constants'

import waitForResourceCreated from '@modules/deploy/actions/shared/wait-for-resource-created'

const createCFResource = (
	cloudFormationClient: CloudFormation,
	cfParams: CreateStackInput,
	successEvent: DOCKERLESS_EVENT
): Observable<DOCKERLESS_EVENT> =>
	new Observable<DOCKERLESS_EVENT>(subscriber => {
		const handleResourceCreated = (): void => {
			waitForResourceCreated(cloudFormationClient, cfParams.StackName).subscribe({
				error: e => subscriber.error(e),
				complete: () => {
					subscriber.next(successEvent)
					subscriber.complete()
				}
			})
		}

		cloudFormationClient
			.createStack(cfParams)
			.promise()
			.then(handleResourceCreated)
			.catch(e => subscriber.error(e))
	})

export default createCFResource
