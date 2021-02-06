import { gql, ApolloServer } from "apollo-server";

// The graphQL scheme
const typeDefs = gql`
    type Movie {
        title: String
        year: Int
    }
    type Query {
        movies: [Movie]
        movie: Movie
    }
    type Mutation {
        createMovie(title:String!): Boolean
        removeMovie(title:String!): Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () => [],
        movie: () => ({ title: "Hello", year: 2021 }),
    },
    Mutation: {
        createMovie: (_, {title}) => true,
        removeMovie: (_, {title}) => true,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});