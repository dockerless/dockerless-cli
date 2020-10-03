import {PromiseResult} from 'aws-sdk/lib/request'
import {AWSError} from 'aws-sdk/lib/error'
import {CreateStackOutput} from 'aws-sdk/clients/cloudformation'
import {ContainerValue} from '@utils/types/dockerless-config'

export default interface DockerlessEvents {
	// SHARED RESOURCES
	sharedResourcesAlreadyExists: () => void
	sharedResourcesDoesNotExist: () => void
	createSharedResourcesStarted: (result: PromiseResult<CreateStackOutput, AWSError>) => void
	createSharedResourcesSuccess: (stackName: string) => void
	createSharedResourcesFailure: (error: Error) => void

	// VPC
	vpcAlreadyExists: () => void
	vpcDoesNotExist: () => void
	createVpcStarted: (result: PromiseResult<CreateStackOutput, AWSError>) => void
	createVpcSuccess: (stackName: string) => void
	createVpcFailure: (error: Error) => void

	// ECS CLUSTER
	clusterAlreadyExists: () => void
	clusterDoesNotExist: () => void
	createClusterStarted: (result: PromiseResult<CreateStackOutput, AWSError>) => void
	createClusterSuccess: (stackName: string) => void
	createClusterFailure: (error: Error) => void

	// SERVICE
	serviceAlreadyExists: (container: ContainerValue) => void
	serviceDoesNotExist: (container: ContainerValue) => void
	createServiceStarted: (result: PromiseResult<CreateStackOutput, AWSError>) => void
	createServiceSuccess: (stackName: string) => void
	createServiceFailure: (error: Error) => void

	// REPOSITORY
	repositoryAlreadyExists: (container: ContainerValue) => void
	repositoryDoesNotExist: (container: ContainerValue) => void
	createRepositoryStarted: (result: PromiseResult<CreateStackOutput, AWSError>) => void
	createRepositorySuccess: (stackName: string) => void
	createRepositoryFailure: (error: Error) => void

	// REPOSITORY
	pushImageStarted: () => void
	pushImageSuccess: () => void
	pushImageFailure: () => void

	// REPOSITORY
	newTaskRevisionRegisterStarted: () => void
	newTaskRevisionRegisterSuccess: () => void
	newTaskRevisionRegisterFailure: (error: Error) => void

	// ALL SERVICE RECURSION
	createdAllServicesStarted: () => void
	createdAllServicesSuccess: () => void
	createdAllServicesFailure: () => void
}
