import {Observable} from 'rxjs'

import {DOCKERLESS_EVENT} from '@utils/constants'

import removeService from '@modules/teardown/actions/remove-service'
import removeRepository from '@modules/teardown/actions/remove-repository'
import removeCluster from '@modules/teardown/actions/remove-cluster'
import removeVpc from '@modules/teardown/actions/remove-vpc'

interface Flows {
	[id: string]: (...args: any[]) => Observable<DOCKERLESS_EVENT>
}

export const TEARDOWN_FLOWS: Flows = {
	[DOCKERLESS_EVENT.serviceAlreadyExists]: removeService,
	[DOCKERLESS_EVENT.repositoryAlreadyExists]: removeRepository,
	[DOCKERLESS_EVENT.clusterAlreadyExists]: removeCluster,
	[DOCKERLESS_EVENT.vpcAlreadyExists]: removeVpc
}
