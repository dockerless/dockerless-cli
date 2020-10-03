import {DOCKERLESS_EVENT} from '@utils/constants'

interface EventTranslations {
	[id: string]: string
}

export const EVENT_TRANSLATIONS: EventTranslations = {
	[DOCKERLESS_EVENT.createSharedResourcesStarted]: 'Creation of shared resources started',
	[DOCKERLESS_EVENT.createSharedResourcesSuccess]: 'Shared resources created',
	[DOCKERLESS_EVENT.sharedResourcesAlreadyExists]: 'The shared resources already exist',
	[DOCKERLESS_EVENT.createVpcStarted]: 'Creation of VPC started',
	[DOCKERLESS_EVENT.createVpcSuccess]: 'VPC created',
	[DOCKERLESS_EVENT.vpcAlreadyExists]: 'The vpc already exists for this stage',
	[DOCKERLESS_EVENT.createClusterStarted]: 'Creation of ECS CLuster started',
	[DOCKERLESS_EVENT.createClusterSuccess]: 'ECS Cluster created',
	[DOCKERLESS_EVENT.clusterAlreadyExists]: 'The ECS cluster for this stage already exists',
	[DOCKERLESS_EVENT.createRepositoryStarted]: 'Started creation of the repository for this container',
	[DOCKERLESS_EVENT.createRepositorySuccess]: 'Repository created',
	[DOCKERLESS_EVENT.repositoryAlreadyExists]:
		'The ECR repository for this container and stage already exists',
	[DOCKERLESS_EVENT.pushImageStarted]: 'Pushing new revision of image to ECR',
	[DOCKERLESS_EVENT.pushImageSuccess]: 'Pushed new revision of image to ECR',
	[DOCKERLESS_EVENT.createServiceStarted]: 'Starting to create new service',
	[DOCKERLESS_EVENT.createServiceSuccess]: 'Service created',
	[DOCKERLESS_EVENT.serviceAlreadyExists]: 'The service already exists',
	[DOCKERLESS_EVENT.newTaskRevisionRegisterStarted]: 'Starting to create new task definition revision',
	[DOCKERLESS_EVENT.newTaskRevisionRegisterSuccess]: 'New task definition registered',
	[DOCKERLESS_EVENT.removeServiceStarted]: 'Removing ECS service',
	[DOCKERLESS_EVENT.removeServiceSuccess]: 'Service successfully removed',
	[DOCKERLESS_EVENT.removeRepositoryStarted]: 'Removing ECR repository',
	[DOCKERLESS_EVENT.removeRepositorySuccess]: 'Repository successfully removed',
	[DOCKERLESS_EVENT.removeClusterStarted]: 'Removing ECS cluster',
	[DOCKERLESS_EVENT.removeClusterSuccess]: 'Cluster successfully removed',
	[DOCKERLESS_EVENT.removeVpcStarted]: 'Removing VPC',
	[DOCKERLESS_EVENT.removeVpcSuccess]: 'VPC successfully removed'
}
