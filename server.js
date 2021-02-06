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
        movie(id: Int!): Movie
    }
    type Mutation {
        createMovie(title:String!, year: Int!, genre: String): Movie
        removeMovie(id:Int!): Movie 
        updateMovie(id:Int!, year:Int!): Movie
    }
`;

const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_, { id }) => client.movie.findUnique({where:{id}}),
    },
    Mutation: {
        createMovie: (_, { title, year, genre }) => 
            client.movie.create({
                    data: {
                        title,
                        year,
                        genre,
                     },
                }),
        removeMovie: (_, {id}) => client.movie.delete({where: {id}}),
        updateMovie: (_, {id, year}) => client.movie.update({where:{id}, data:{year}})
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`);
});