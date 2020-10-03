import {Observable} from 'rxjs'

import {DOCKERLESS_EVENT} from '@utils/constants'

import createSharedResources from '@modules/deploy/actions/create-shared-resources'
import createVpc from '@modules/deploy/actions/create-vpc'
import createCluster from '@modules/deploy/actions/create-cluster'
import createRepository from '@modules/deploy/actions/create-repository'
import createService from '@modules/deploy/actions/create-service'

interface Flows {
	[id: string]: (...args: any[]) => Observable<DOCKERLESS_EVENT>
}

export const DEPLOY_FLOWS: Flows = {
	[DOCKERLESS_EVENT.sharedResourcesDoesNotExist]: createSharedResources,
	[DOCKERLESS_EVENT.vpcDoesNotExist]: createVpc,
	[DOCKERLESS_EVENT.clusterDoesNotExist]: createCluster,
	[DOCKERLESS_EVENT.repositoryDoesNotExist]: createRepository,
	[DOCKERLESS_EVENT.serviceDoesNotExist]: createService
}
