import {gql} from "@apollo/client"
export const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $firstName: String!
        $lastName: String!
        $email: String!
        $password: String
    ){
        createUser( 
            firstName: $firstName
            lastName: $lastName
            email: $email
            password: $password
        ){
            firstName
            lastName
            email
        }
    }
`;


// mutation{
//     createUser(firstName:"Shasa", lastName:"Thuo", email:"wolan@mashta.com", password:"wolan"){
//       firstName
//       lastName
//       email 
//     }
//   }

//https://github.com/machadop1407/GraphQL-ApolloClient-Template/blob/main/client/src/GraphQL/Mutations.js
