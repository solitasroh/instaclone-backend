import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import { getUser, protectResolver } from './users/users.utils'
dotenv.config()

import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'

// The graphQL scheme
const PORT = process.env.PORT
const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
            protectResolver,
        }
    },
})

const app = express()
app.use(logger('tiny'))

apollo.applyMiddleware({ app })

app.use('/static', express.static('uploads'))
app.listen({ port: PORT }, () => {
    console.log(`✅ Server ready at http://localhost:${PORT}`)
})
