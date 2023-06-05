import * as core from '@actions/core'
import { getAWSDetail, getEnv } from './rezio'
import { context } from '@actions/github'

async function run(): Promise<void> {
  try {
    const env = getEnv(context.eventName, context.ref)

    if (env) {
      core.info(`environment is ${env}`)
    } else {
      core.info('unknown environment!')
    }

    core.info(new Date().toTimeString())
    core.exportVariable('REZIO_ENV', env)
    core.setOutput('rezio-env', env)

    const { region, cluster } = getAWSDetail(env)

    core.exportVariable('AWS_REGION', region)
    core.setOutput('aws-region', region)
    core.exportVariable('EKS_CLUSTER', cluster)
    core.setOutput('eks-cluster', cluster)

    core.exportVariable('DOMAIN_PREFIX', env === 'sit' ? 'prototype-' : '')
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
