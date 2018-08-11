import { TQueryLog } from './createShortlink'

export default function parseShortlink(options) {
  return (req, res) => {
    const { id: queryId } = req.query
    const { queryLog }: TQueryLog = res.locals
    const queryUrl = queryLog[queryId]

    if (!queryUrl) {
      return res.sendStatus(404).end()
    }

    return res.redirect(queryUrl)
  }
}
