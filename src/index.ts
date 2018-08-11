import { Express } from 'express'
import createShortlink from './createShortlink'
import parseShortlink from './parseShortlink'

export type TGraphQLDebuggerOptions = {
  graphqlUrl: string
  inspectorUrl: string
  reportQuery: (queryShortlink: string) => void
}

const defaultOptions: TGraphQLDebuggerOptions = {
  graphqlUrl: '/graphql',
  inspectorUrl: '/goto',
  reportQuery: (queryShortlink) =>
    console.log(`Received query, inspect: ${queryShortlink}`),
}

export default function graphqlQueryShortlink(
  app: Express,
  options: TGraphQLDebuggerOptions,
): Express {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  }

  const queryLog = {}

  app.use(options.graphqlUrl, createShortlink(queryLog, mergedOptions))
  app.use(options.inspectorUrl, parseShortlink(queryLog, mergedOptions))

  return app
}
