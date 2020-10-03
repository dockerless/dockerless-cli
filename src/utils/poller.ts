import EventEmitter from 'events'

export default class Poller extends EventEmitter {
	private readonly timeout: number

	constructor(timeout: number) {
		super()
		this.timeout = timeout
	}

	poll() {
		setTimeout(() => this.emit('poll'), this.timeout)
	}

	onPoll(cb: () => void) {
		this.on('poll', cb)
	}
}
