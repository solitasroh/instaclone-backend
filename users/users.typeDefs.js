import {gql} from "graphql"

export default gql`
    type User {
        id: String!
        firstName:      String!
        lastName:       String
        userName:       String!
        email:          String!
        createdAt: String!
        updatedAt: String!
    }
    type loginResult {
        ok: Boolean!
        token: String
        error: String
    }
    type Mutation {
        createAccount(
            firstName: String!
            lastName: String
            userName: String!
            email: String!
            password: String!
        ): User
        login(
            userName: String!
            password: String!
        ): loginResult!
    }
    type Query {
        seeProfile(
            userName: String
        ): User
    }
`;