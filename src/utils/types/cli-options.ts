import DockerlessStage from '@utils/types/stage-enum'

export default interface CliOptions {
	stage: DockerlessStage
	container: string
}
