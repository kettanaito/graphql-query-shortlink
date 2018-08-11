import { TQueryLog } from './createShortlink'
import { TGraphQLDebuggerOptions } from '.'

export default function parseShortlink(
  queryLog: TQueryLog,
  options: TGraphQLDebuggerOptions,
) {
  return (request, response) => {
    const { id: queryId } = request.query
    const queryUrl = queryLog[queryId]

    if (!queryUrl) {
      return response.sendStatus(404).end()
    }

    return response.redirect(queryUrl)
  }
}
