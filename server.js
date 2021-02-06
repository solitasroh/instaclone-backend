import { gql, ApolloServer } from "apollo-server";

// The graphQL scheme
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'world',
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});