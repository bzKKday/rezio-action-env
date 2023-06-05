import { getAWSDetail, getEnv } from '../src/rezio'
import { expect, it } from '@jest/globals'

it('should get correct env', () => {
  expect(getEnv('release', 'master')).toBe('prod')
  expect(getEnv('push', 'feature/prototype')).toBe('sit')
  expect(getEnv('push', 'feature/special')).toBe('sit')
  expect(getEnv('push', 'stable/v1.0')).toBe('uat')
  expect(getEnv('push', 'stable/v9.9')).toBe('uat')
  expect(getEnv('push', 'master')).toBe('sta')
})

const AWS_TOKYO = 'ap-northeast-1'
const AWS_SINGAPORE = 'ap-southeast-1'

test('getAWSDetail', () => {
  expect(getAWSDetail('sit').region).toBe(AWS_SINGAPORE)
  expect(getAWSDetail('uat').region).toBe(AWS_SINGAPORE)
  expect(getAWSDetail('sta').region).toBe(AWS_TOKYO)
  expect(getAWSDetail('prod').region).toBe(AWS_TOKYO)

  expect(getAWSDetail('sit').cluster).toBe('rezio-dev')
  expect(getAWSDetail('uat').cluster).toBe('tako-uat')
  expect(getAWSDetail('sta').cluster).toBe('tako-prod')
  expect(getAWSDetail('prod').cluster).toBe('tako-prod')
})
