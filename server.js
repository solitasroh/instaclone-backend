import dotenv from "dotenv"
import {getUser} from "./users/users.utils"
dotenv.config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";

// The graphQL scheme

const server = new ApolloServer({
    schema,
    context: async ({req}) => {
        return {
            loggedInUser: await getUser(req.headers.token),
        }
    }
});

const PORT = process.env.PORT;

server.listen(PORT).then(({url}) => {
    console.log(`✅ Server ready at ${url}`);
});