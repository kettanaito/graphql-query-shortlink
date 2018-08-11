import * as objectHash from 'object-hash'
import { TGraphQLDebuggerOptions } from '.'
import createQueryString from './createQueryString'

export type TQueryLog = {
  [queryHash: string]: string
}

export default function createShortlink(options: TGraphQLDebuggerOptions) {
  const { graphqlUrl, inspectorUrl, reportQuery } = options

  return (request, response, next) => {
    const {
      headers: { host },
      body: { query, variables },
    } = request
    const {
      locals: { queryLog },
    } = response.app

    const queryString = createQueryString({
      query,
      variables: JSON.stringify(variables),
    })

    const queryHash = objectHash.MD5({ query, variables })
    queryLog[queryHash] = `http://${host}${graphqlUrl}?${queryString}`

    const queryShortlink = `http://${host}${inspectorUrl}?id=${queryHash}`
    reportQuery(queryShortlink)

    return next()
  }
}
