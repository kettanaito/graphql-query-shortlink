import * as objectHash from 'object-hash'
import { TGraphQLDebuggerOptions } from '.'
import createQueryString from './createQueryString'

export type TQueryLog = {
  [queryHash: string]: string
}

export default function createShortlink(
  queryLog: TQueryLog,
  options: TGraphQLDebuggerOptions,
) {
  const { graphqlUrl, inspectorUrl, reportQuery } = options

  return (req, res, next) => {
    const {
      headers: { host },
      body: { query, variables },
    } = req

    const queryString = createQueryString({
      query,
      variables: JSON.stringify(variables),
    })

    const queryHash = objectHash.sha1({ query, variables })
    queryLog[queryHash] = `http://${host}${graphqlUrl}?${queryString}`

    const queryShortlink = `http://${host}${inspectorUrl}?id=${queryHash}`
    reportQuery(queryShortlink)

    res.locals.queryLog = queryLog

    return next()
  }
}
