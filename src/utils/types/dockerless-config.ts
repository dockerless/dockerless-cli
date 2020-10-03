interface ContainersObject {
	[key: string]: ContainerValue
}

export interface ContainerValue {
	containerName: string
	dockerFilePath: string
	size: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'
	port: number
	portProtocol: 'HTTP' | 'TCP' | 'TCP_UDP' | 'TLS' | 'UDP'
	desiredInstances: number
	loadbalancer: boolean
	dependencies: string[]
	networkType?: 'public' | 'private'
}

export default interface DockerlessConfig {
	version: string
	serviceName: string
	containers: ContainersObject
}
