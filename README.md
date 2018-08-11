# graphql-query-shortlink

A middleware that creates shortlinks for received GraphQL queries that link to the GraphiQL.

## Getting started

### Install

```bash
npm install graphql-query-shortlink
```

### Use middleware

```js
import express from 'express'
import bodyParser from 'body-parser'
import { buildSchema } from 'graphql'
import graphqlHTTP from 'express-graphql'
import graphqlQueryShortlink from 'graphql-query-shortlink'

const app = express()

app.use(bodyParser.json())

graphqlQueryShortlink(app, {
  graphqlUrl: '/graphql',
})

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Query {
      hello: string
    }
  `),
  rootValue: {
    hello: () => 'Hello, world!'
  }
  graphiql: true
}))

app.listen(3001)
```

## Materials

- [Debugging complex GraphQL queries with shortlinks to GraphiQL](https://nilsnh.no/2018/08/04/debugging-complex-graphql-queries-with-shortlinks-to-graphiql)

## Special thanks

- [Nils Norman Haukås](https://nilsnh.no/) for the original idea
