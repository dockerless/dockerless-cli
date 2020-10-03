import yaml from 'js-yaml'
import fs from 'fs'

import {DockerlessState} from '@utils/types'
import DockerlessStage from '@utils/types/stage-enum'

export const GlobalDockerlessState: DockerlessState = {
	stage: DockerlessStage.dev,
	config: yaml.safeLoad(fs.readFileSync('dockerless.yml', 'utf8'))
}
