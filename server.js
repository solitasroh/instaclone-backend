import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import { getUser, protectResolver } from './users/users.utils'
dotenv.config()
import http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { typeDefs, resolvers } from './schema'
import { graphqlUploadExpress } from 'graphql-upload'

// The graphQL scheme
const PORT = process.env.PORT
const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    uploads: false,
    context: async ({ req }) => {
        if (req) {
            return {
                loggedInUser: await getUser(req.headers.token),
                protectResolver,
            }
        }
    },
})

const app = express()
app.use(logger('tiny'))
app.use(graphqlUploadExpress())
apollo.applyMiddleware({ app })

app.use('/static', express.static('uploads'))

const httpServer = http.createServer(app)
apollo.installSubscriptionHandlers(httpServer)
httpServer.listen(PORT, () => {
    console.log(`✅ Server ready at http://localhost:${PORT}`)
})
