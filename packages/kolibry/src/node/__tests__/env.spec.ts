import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, test } from 'vitest'
import { loadEnv } from '../env'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

describe('loadEnv', () => {
   test('basic', () => {
      expect(loadEnv('development', join(__dirname, './env')))
         .toMatchInlineSnapshot(`
        {
          "KOLIBRY_APP_BASE_ROUTE": "/",
          "KOLIBRY_APP_BASE_URL": "/",
          "KOLIBRY_ENV1": "ENV1",
          "KOLIBRY_ENV2": "ENV2",
          "KOLIBRY_ENV3": "ENV3",
        }
      `)
   })

   test('specific prefix', () => {
      expect(loadEnv('development', join(__dirname, './env'), 'VKOLIBRY'))
         .toMatchInlineSnapshot(`
        {
          "VKOLIBRY_A": "A",
          "VKOLIBRY_B": "B",
        }
      `)
   })

   test('override', () => {
      expect(loadEnv('production', join(__dirname, './env')))
         .toMatchInlineSnapshot(`
        {
          "KOLIBRY_APP_BASE_ROUTE": "/app/",
          "KOLIBRY_APP_BASE_URL": "/app/",
        }
      `)
   })

   test('KOLIBRY_USER_NODE_ENV', () => {
      loadEnv('development', join(__dirname, './env'))
      expect(process.env.KOLIBRY_USER_NODE_ENV).toEqual(undefined)
   })

   test('KOLIBRY_USER_NODE_ENV for dev behaviour in build', () => {
      const _nodeEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      loadEnv('testing', join(__dirname, './env'))
      expect(process.env.KOLIBRY_USER_NODE_ENV).toEqual('development')
      process.env.NODE_ENV = _nodeEnv
   })

   test('Already exists KOLIBRY_USER_NODE_ENV', () => {
      process.env.KOLIBRY_USER_NODE_ENV = 'test'
      loadEnv('development', join(__dirname, './env'))
      expect(process.env.KOLIBRY_USER_NODE_ENV).toEqual('test')
   })

   test('prioritize existing process.env', () => {
      process.env.KOLIBRY_ENV_TEST_ENV = 'EXIST'
      expect(loadEnv('existing', join(__dirname, './env')))
         .toMatchInlineSnapshot(`
        {
          "KOLIBRY_APP_BASE_ROUTE": "/",
          "KOLIBRY_APP_BASE_URL": "/",
          "KOLIBRY_ENV_TEST_ENV": "EXIST",
          "KOLIBRY_USER_NODE_ENV": "test",
        }
      `)
   })
})
