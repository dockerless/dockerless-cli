import {Observable} from 'rxjs'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {EVENT_TRANSLATIONS} from '@modules/event-translations'

export const createTask = (
	action: (...dependencies: any[]) => Observable<DOCKERLESS_EVENT>,
	...dependencies: any[]
) => (): Observable<string> => {
	return new Observable(observer => {
		action(...dependencies).subscribe({
			next(x) {
				observer.next(EVENT_TRANSLATIONS[x])
			},
			error(err) {
				observer.error(err)
			},
			complete() {
				observer.complete()
			}
		})
	})
}
