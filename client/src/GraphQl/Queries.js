import {gql} from '@apollo/client'
export const LOAD_USERS = gql`
query{
    getAllUsers{
      firstName
      lastName
      email
    }
  }
`

// this goes to rootquery then rootquery redirects to getsingleuser
export const FETCH_INDIVIDUAL_USER = gql`
  query($id: Int!){ 
    getSingleUser(id: $id){
      firstName
      lastName
      email
    }
  }
`

// export const FETCH_INDIVIDUAL_USER = gql`
// query{
//     getAllUsers{
//       firstName
//       lastName
//       email
//     }
//   }
// `