import url from 'url'
import createHash from 'object-hash'
import { TGraphQLDebuggerOptions } from '.'

export type TQueryLog = {
  [queryId: string]: string
}

export default function createShortlink(options: TGraphQLDebuggerOptions) {
  const { graphqlUrl, inspectorUrl, reportQuery } = options

  return (req, res, next) => {
    const queryLog: TQueryLog = {}
    const { query, variables } = req.body
    const queryString = url.format({
      query: {
        query,
        variables,
      },
    })

    const queryId = createHash({ query, variables })
    queryLog[queryId] = `http://localhost:abcd${graphqlUrl}?${queryString}`

    const queryShortlink = `http://localhost:abcd${inspectorUrl}?id=${queryId}`
    reportQuery(queryShortlink)

    res.locals.queryLog = queryLog

    return next()
  }
}
