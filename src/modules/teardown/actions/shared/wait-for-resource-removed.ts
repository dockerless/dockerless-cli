import {Observable} from 'rxjs'
import CloudFormation, {DescribeStacksInput} from 'aws-sdk/clients/cloudformation'

import {CF_DOES_NOT_EXIT_ERROR, POLL_TIME} from '@utils/constants'

import Poller from '@utils/poller'

const waitForResourceRemoved = (
	cloudFormationClient: CloudFormation,
	stackName: string
): Observable<boolean> =>
	new Observable<boolean>(subscriber => {
		const cfParams: DescribeStacksInput = {
			StackName: stackName
		}

		const poller = new Poller(POLL_TIME)

		poller.onPoll(async () => {
			try {
				const cfResult = await cloudFormationClient.describeStacks(cfParams).promise()
				const stackStatus = cfResult.Stacks[0].StackStatus

				switch (stackStatus) {
					case 'DELETE_IN_PROGRESS':
						subscriber.next(false)
						poller.poll() // Go for the next poll
						break
					case 'DELETE_COMPLETE':
						subscriber.complete()
						break
					default:
						subscriber.error(new Error('UNKOWN CF STATUS'))
						break
				}
			} catch (err) {
				if (err.message.includes(CF_DOES_NOT_EXIT_ERROR)) {
					subscriber.complete()
				} else {
					subscriber.error(err)
				}
			}
		})

		// Initial start
		poller.poll()
	})

export default waitForResourceRemoved
