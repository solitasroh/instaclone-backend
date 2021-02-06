import dotenv from "dotenv"
dotenv.config();

import { ApolloServer } from "apollo-server";
import schema from "./schema";

// The graphQL scheme

const server = new ApolloServer({
    schema
});

const PORT = process.env.PORT;

server.listen(PORT).then(({url}) => {
    console.log(`✅ Server ready at ${url}`);
});