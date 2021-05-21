# Dockerless

Dockerless was designed from the ground up to be easily installed and used to get your dockerized application up and running quickly on AWS.

**Not actively maintained since AWS launched the [Copilot](https://aws.amazon.com/containers/copilot) service.**

[![docs](https://img.shields.io/badge/Docs-Dockerless-blue.svg)](https://dockerless.io/docs)
![npm](https://img.shields.io/npm/v/@dockerless/cli.svg)
![David](https://img.shields.io/david/dockerless/dockerless-cli.svg)

![Dockerless Logo](docs/images/dockerless-logo.png)

---

### Quick start

#### Install

`$ npm install -g @dockerless/cli`

---

The documentation can be found on the [Dockerless Docs Website](https://dockerless.io/docs/).

---

### Using locally for contributing to Dockerless

#### Install

`$ npm install`

#### Linking package for local use

It's important to not have the global Dockerless package installed.

`$ npm link`

#### Build the code

`$ npm run build`

#### Using the package

`$ dockerless`
