# Dockerless Multi-tier App Example

## Install

`$ npm install`

## Deploy

`$ dockerless deploy`

You can get the URL of your deployed public service from the CloudFormation Outputs tab.

Private services can be communicated to within the network the services are deployed in.

Example Redis endpoint: `hello-redis-dev.hello-namespace-dev`

Example private service endpoint: `http://hello-privateapp-dev.hello-namespace-dev:81`

Example request:

```javascript
axios({
	method: 'GET',
	url: 'http://docke-publi-1mk0yu8qqkbjd-2121886729.eu-west-1.elb.amazonaws.com/',
	params: {
		url: 'http://hello-privateapp-dev.hello-namespace-dev:81'
	}
})
```
