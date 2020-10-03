import {concat, Observable} from 'rxjs'
import ECS from 'aws-sdk/clients/ecs'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {ContainerValue} from '@utils/types/dockerless-config'
import newTaskRegistered from '@modules/deploy/actions/new-task-registered'

const registerNewTask = new Observable<DOCKERLESS_EVENT>(subscriber => {
	subscriber.next(DOCKERLESS_EVENT.newTaskRevisionRegisterStarted)
	subscriber.complete()
})

export default (ecsClient: ECS, container: ContainerValue): Observable<DOCKERLESS_EVENT> =>
	concat(registerNewTask, newTaskRegistered(ecsClient, container))
