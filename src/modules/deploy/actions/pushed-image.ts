import {Observable} from 'rxjs'
import util from 'util'
import STS from 'aws-sdk/clients/sts'

import {DOCKERLESS_EVENT} from '@utils/constants'
import {toId} from '@utils/string-utils'
import {GlobalDockerlessState} from '@src/dockerless-state'
import {ContainerValue} from '@utils/types/dockerless-config'

const pushedimage = (stsClient: STS, container: ContainerValue): Observable<DOCKERLESS_EVENT> =>
	new Observable(subscriber => {
		const exec = util.promisify(require('child_process').exec)

		const pushImage = async () => {
			const localImageTagName = `${toId(GlobalDockerlessState.config.serviceName)}-${toId(
				container.containerName
			)}-${GlobalDockerlessState.stage}`
			const dockerAppPath = container.dockerFilePath.replace('/Dockerfile', '')
			const awsAccountId = (await stsClient.getCallerIdentity().promise()).Account
			const remoteImageTagName = `${awsAccountId}.dkr.ecr.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/${localImageTagName}:latest`

			const ecrGetLoginCommand = `aws ecr get-login-password --region ${process.env.AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${awsAccountId}.dkr.ecr.${process.env.AWS_DEFAULT_REGION}.amazonaws.com`
			const dockerBuildCommand = `docker build -t ${localImageTagName} ${dockerAppPath}`
			const remoteTagCommand = `docker tag ${localImageTagName}:latest ${remoteImageTagName}`
			const dockerPushCommand = `docker push ${remoteImageTagName}`

			const {stderr: loginCommandErr} = await exec(`${ecrGetLoginCommand}`)

			if (loginCommandErr) {
				throw loginCommandErr
			}

			const {stderr: pushError} = await exec(
				`${dockerBuildCommand} && ${remoteTagCommand} && ${dockerPushCommand}`
			)

			if (pushError) {
				throw pushError
			}
		}

		pushImage()
			.then(() => subscriber.next(DOCKERLESS_EVENT.pushImageSuccess))
			.catch(err => subscriber.error(err))
			.finally(() => subscriber.complete())
	})

export default pushedimage
