import dotenv from "dotenv"
import {getUser, protectResolver} from "./users/users.utils"
dotenv.config();

import { ApolloServer } from "apollo-server";
import {typeDefs, resolvers} from "./schema";

// The graphQL scheme

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
            protectResolver,
        }
    }
});

const PORT = process.env.PORT;

server.listen(PORT).then(({url}) => {
    console.log(`✅ Server ready at ${url}`);
});