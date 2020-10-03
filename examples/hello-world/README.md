# Dockerless Hello World Example

## Install

`$ npm install`

## Deploy

`$ dockerless deploy`

You can get the URL of your deployed service from the CloudFormation Outputs tab.

Example request:

```javascript
axios({
	method: 'GET',
	url: 'http://docke-publi-1mk0yu8qqkbjd-2121886729.eu-west-1.elb.amazonaws.com/'
})
```
