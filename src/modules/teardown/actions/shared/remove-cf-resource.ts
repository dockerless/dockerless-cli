import CloudFormation from 'aws-sdk/clients/cloudformation'
import {Observable} from 'rxjs'
import {DOCKERLESS_EVENT} from '@utils/constants'

import waitForResourceRemoved from '@modules/teardown/actions/shared/wait-for-resource-removed'

const removeCFResource = (
	cloudFormationClient: CloudFormation,
	stackName: string,
	successEvent: DOCKERLESS_EVENT
): Observable<DOCKERLESS_EVENT> =>
	new Observable<DOCKERLESS_EVENT>(subscriber => {
		const cfParams = {
			StackName: stackName
		}

		const waitForServiceRemoved = (): void => {
			waitForResourceRemoved(cloudFormationClient, stackName).subscribe({
				error: e => subscriber.error(e),
				complete: () => {
					subscriber.next(successEvent)
					subscriber.complete()
				}
			})
		}

		cloudFormationClient
			.deleteStack(cfParams)
			.promise()
			.then(waitForServiceRemoved)
			.catch(e => subscriber.error(e))
	})

export default removeCFResource
