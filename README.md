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

## API

### `graphqlUrl: string`

**Default:** `/graphql`

A relaive URL to the GraphQL endpoint.

---

### `inspectorUrl: string`

**Default:** `/goto`

A relative URL of the generated query shortlink.

---

### `reportQuery: (shortlink: string) => void`

**Default:**

```js
graphqlQueryShortlink(app, {
  reportQuery(shortlink) {
    console.log(`Inspect the query: ${shortlink}`)
  },
})
```

A custom reporter function used for logging the shortlinks into the console.

## Materials

- [Debugging complex GraphQL queries with shortlinks to GraphiQL](https://nilsnh.no/2018/08/04/debugging-complex-graphql-queries-with-shortlinks-to-graphiql)

## Special thanks

- [Nils Norman Haukås](https://nilsnh.no/) for the original idea
