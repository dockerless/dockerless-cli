import DockerlessConfig from '@utils/types/dockerless-config'
import DockerlessStage from '@utils/types/stage-enum'

export default interface DockerlessState {
	stage: DockerlessStage
	config: DockerlessConfig
}
