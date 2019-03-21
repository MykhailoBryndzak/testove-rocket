const {buildSchema} = require('graphql');

const graphqlSchema = `
      type User {
        _id: ID!
        email: String!
        password: String
        firstName: String
        lastName: String
      }
      
      type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
        firstName: String
        lastName: String
      }
      
      input UserInput {
        email: String!
        password: String!
        firstName: String
        lastName: String
      }
    
      type RootQuery {
        login(email: String!, password: String!): AuthData!
      }
      
      type RootMutation {
        createUser(userInput: UserInput): User
      }
      
      schema {
        query: RootQuery  
        mutation: RootMutation
      }
`;

module.exports = buildSchema(graphqlSchema);

