import express from 'express'
import graphqlQueryShortlink from '../src'

test('Test', () => {
  const app = express()

  graphqlQueryShortlink(app, {
    graphqlEndpoint: '/graphql',
  })

  app.listen(3002, () => {
    fetch('http://localhost:3002/graphql?query=FOO')
    fetch('http://localhost:3002/goto?id=ABC')
  })
})
