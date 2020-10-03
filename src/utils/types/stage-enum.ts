enum DockerlessStage {
	dev = 'dev',
	tst = 'tst',
	prod = 'prod'
}

export default DockerlessStage

export type DockerlessStageKey = keyof typeof DockerlessStage
