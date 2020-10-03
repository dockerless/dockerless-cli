import {Subscriber} from 'rxjs'

import {CF_DOES_NOT_EXIT_ERROR, DOCKERLESS_EVENT} from '@utils/constants'

export const handleCloudFormationStackErrorDoesNotExist = (
	err: Error,
	event: DOCKERLESS_EVENT,
	subscriber: Subscriber<DOCKERLESS_EVENT>
): void => {
	if (err.message.includes(CF_DOES_NOT_EXIT_ERROR)) {
		subscriber.next(event)
	} else {
		subscriber.error(err)
	}
}
