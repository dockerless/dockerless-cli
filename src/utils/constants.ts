import sharedResourcesYml from '@utils/resources/cloudformations/shared-resources.yml'
import vpcYml from '@utils/resources/cloudformations/vpc.yml'
import repositoryYml from '@utils/resources/cloudformations/repository.yml'
import fargateClusterYml from '@utils/resources/cloudformations/fargate-cluster.yml'
import fargateServiceYml from '@utils/resources/cloudformations/fargate-service.yml'

export const POLL_TIME = 5 * 1000 // 5000 milliseconds = 5 seconds

export const CF_DOES_NOT_EXIT_ERROR = 'does not exist'

export enum DOCKERLESS_EVENT {
	// SHARED RESOURCES
	sharedResourcesAlreadyExists = 'sharedResourcesAlreadyExists',
	sharedResourcesDoesNotExist = 'sharedResourcesDoesNotExist',
	createSharedResourcesStarted = 'createSharedResourcesStarted',
	createSharedResourcesSuccess = 'createSharedResourcesSuccess',
	createSharedResourcesFailure = 'createSharedResourcesFailure',

	// VPC
	vpcAlreadyExists = 'vpcAlreadyExists',
	vpcDoesNotExist = 'vpcDoesNotExist',
	createVpcStarted = 'createVpcStarted',
	createVpcSuccess = 'createVpcSuccess',
	createVpcFailure = 'createVpcFailure',
	removeVpcStarted = 'removeVpcStarted',
	removeVpcSuccess = 'removeVpcSuccess',
	removeVpcFailure = 'removeVpcFailure',

	// ECS CLUSTER
	clusterAlreadyExists = 'clusterAlreadyExists',
	clusterDoesNotExist = 'clusterDoesNotExist',
	createClusterStarted = 'createClusterStarted',
	createClusterSuccess = 'createClusterSuccess',
	createClusterFailure = 'createClusterFailure',
	removeClusterStarted = 'removeClusterStarted',
	removeClusterSuccess = 'removeClusterSuccess',
	removeClusterFailure = 'removeClusterFailure',

	// SERVICE
	serviceAlreadyExists = 'serviceAlreadyExists',
	serviceDoesNotExist = 'serviceDoesNotExist',
	createServiceStarted = 'createServiceStarted',
	createServiceSuccess = 'createServiceSuccess',
	createServiceFailure = 'createServiceFailure',
	removeServiceStarted = 'removeServiceStarted',
	removeServiceSuccess = 'removeServiceSuccess',
	removeServiceFailure = 'removeServiceFailure',

	// REPOSITORY
	repositoryAlreadyExists = 'repositoryAlreadyExists',
	repositoryDoesNotExist = 'repositoryDoesNotExist',
	createRepositoryStarted = 'createRepositoryStarted',
	createRepositorySuccess = 'createRepositorySuccess',
	createRepositoryFailure = 'createRepositoryFailure',
	removeRepositoryStarted = 'removeRepositoryStarted',
	removeRepositorySuccess = 'removeRepositorySuccess',
	removeRepositoryFailure = 'removeRepositoryFailure',

	// IMAGE
	pushImageStarted = 'pushImageStarted',
	pushImageSuccess = 'pushImageSuccess',
	pushImageFailure = 'pushImageFailure',

	// TASK REVISION
	newTaskRevisionRegisterStarted = 'newTaskRevisionRegisterStarted',
	newTaskRevisionRegisterSuccess = 'newTaskRevisionRegisterSuccess',
	newTaskRevisionRegisterFailure = 'newTaskRevisionRegisterFailure',

	// ALL SERVICE RECURSION
	createdAllServicesStarted = 'createdAllServicesStarted',
	createdAllServicesSuccess = 'createdAllServicesSuccess',
	createdAllServicesFailure = 'createdAllServicesFailure'
}

// CloudFormation YMLS

export const SHARED_RESOURCES_YML = Buffer.from(sharedResourcesYml.value, 'base64').toString()

export const VPC_YML = Buffer.from(vpcYml.value, 'base64').toString()

export const CLUSTER_YML = Buffer.from(fargateClusterYml.value, 'base64').toString()

export const SERVICE_YML = Buffer.from(fargateServiceYml.value, 'base64').toString()

export const REPOSITORY_YML = Buffer.from(repositoryYml.value, 'base64').toString()
