import { PrismaClient } from "@prisma/client";
import { gql, ApolloServer } from "apollo-server";

const client = new PrismaClient();

// The graphQL scheme
const typeDefs = gql`
    type Movie {
        id: Int!
        title: String!
        year: Int!
        genre: String
        createdAt: String!
        updatedAt: String!
    }
    type Query {
        movies: [Movie]
        movie: Movie
    }
    type Mutation {
        createMovie(title:String!, year: Int!, genre: String): Boolean
        removeMovie(title:String!): Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: () => ({ title: "Hello", year: 2021 }),
    },
    Mutation: {
        createMovie: (_, {title, year, genre}) => {
            client.movie.create({data: {
                title, year, genre,
            }})
        },
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