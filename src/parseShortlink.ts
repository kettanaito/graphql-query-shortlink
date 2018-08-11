import { TQueryLog } from './createShortlink'
import { TGraphQLDebuggerOptions } from '.'

export default function parseShortlink(
  queryLog: TQueryLog,
  options: TGraphQLDebuggerOptions,
) {
  return (req, res) => {
    const { id: queryId } = req.query
    const queryUrl = queryLog[queryId]

    if (!queryUrl) {
      return res.sendStatus(404).end()
    }

    return res.redirect(queryUrl)
  }
}
