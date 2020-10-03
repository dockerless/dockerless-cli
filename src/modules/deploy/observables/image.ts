import {concat, Observable} from 'rxjs'
import STS from 'aws-sdk/clients/sts'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {ContainerValue} from '@utils/types/dockerless-config'
import pushedimage from '@modules/deploy/actions/pushed-image'

const imagePush = new Observable<DOCKERLESS_EVENT>(subscriber => {
	subscriber.next(DOCKERLESS_EVENT.pushImageStarted)
	subscriber.complete()
})

export default (stsClient: STS, container: ContainerValue): Observable<DOCKERLESS_EVENT> =>
	concat(imagePush, pushedimage(stsClient, container))
