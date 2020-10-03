import {Observable} from 'rxjs'
import CloudFormation, {GetTemplateInput} from 'aws-sdk/clients/cloudformation'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {handleCloudFormationStackErrorDoesNotExist} from '@utils/error-helpers'

const checkResourceExists = (
	cloudFormationClient: CloudFormation,
	stackName: string,
	existsEvent: DOCKERLESS_EVENT,
	doesNotExistEvent: DOCKERLESS_EVENT
): Observable<DOCKERLESS_EVENT> =>
	new Observable(subscriber => {
		const cfParams: GetTemplateInput = {
			StackName: stackName
		}

		cloudFormationClient
			.getTemplate(cfParams)
			.promise()
			.then(() => subscriber.next(existsEvent))
			.catch(e => handleCloudFormationStackErrorDoesNotExist(e, doesNotExistEvent, subscriber))
			.finally(() => subscriber.complete())
	})

export default checkResourceExists
