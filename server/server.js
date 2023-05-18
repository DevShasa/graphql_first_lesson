const express = require("express")
const app = express()
const PORT = 6969
const cors = require("cors")
const morgan = require("morgan")
const graphql =  require("graphql")
const fs = require('fs')

const {
        GraphQLObjectType, 
        GraphQLSchema,
        GraphQLInt,
        GraphQLString,
        GraphQLList,
} = require("graphql")
const {graphqlHTTP} = require("express-graphql")
const userData = require("./MOCK_DATA.json")

app.use(morgan("dev"))
app.use(cors());
app.use(express.json());


const UserType = new GraphQLObjectType({
    name:"UserTable",
    fields: ()=>({
        id: {type: GraphQLInt},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    })
})
const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        getAllUsers:{
            type: GraphQLList(UserType),
            resolve(parent, args){
                // this si where you connect to database
                return userData
            }
        },
        getSingleUser:{
            type: UserType,
            args:{
                id: {type: GraphQLInt},
            },
            resolve(parent, args){
                const user = userData.filter(user => user.id === args.id)
                return user[0] || null
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        createUser:{
            type: UserType,
            args: {
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent, args){
                // this is where you access the password
                userData.push({
                    id: userData.length + 1,
                    firstName:args.firstName,
                    lastName:args.lastName,
                    email:args.email,
                    password:args.password
                })

                fs.writeFile('MOCK_DATA.json', JSON.stringify(userData), 'utf-8', (err)=>{
                    if(err){
                        console.error("Could not write to file", err)
                    }else{
                        console.log("JSON FILE CREATED SUCCESSFULY")
                    }
                })
                // res.send
                return args
            }
        }
        // next field etc
    }
})
const schema = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(PORT, ()=>{
    console.log("THE SERVER IS RUNNING ON: ",PORT)
})

// query{
//     getAllUsers{
//       firstName
//       lastName
//       email
//     }
//   }

// mutation{
//     createUser(firstName:"Shasa", lastName:"Thuo", email:"wolan@mashta.com", password:"wolan"){
//       firstName
//       lastName
//       email 
//     }
//   }


// query{
//     getSingleUser(id:56){
//       firstName
//       lastName
//       email 
//     }
//   }