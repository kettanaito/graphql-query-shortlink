const express = require('express')
const bodyParser = require('body-parser')
const expressGraphQL = require('express-graphql')
const graphql = require('graphql')
const graphqlQueryShortlink = require('../lib').default

const app = express()
const schema = graphql.buildSchema(`
  type Query {
    hello: String
  }
`)

const rootValue = {
  hello: () => 'Hello, world!',
}

app.use(bodyParser.json())

graphqlQueryShortlink(app, {
  graphqlUrl: '/graphql',
  inspectorUrl: '/goto',
})

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    rootValue,
    graphiql: true,
  }),
)

app.listen(4002, () => {
  console.log('Server established at http://localhost:4002')
})
