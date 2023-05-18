import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import GetUsers from "./Components/GetUsers";
import Form from "./Components/Form";
import SingleUser from "./Components/SingleUser";

const errorLink = onError(({graphqlErrors, networkError})=>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path})=>{
      console.log("ERROR", message, location, path)
    })
  }
});

const link = from([
  errorLink,
  new HttpLink({uri:"http://localhost:6969/graphqL"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link:link
})

function App() {
  return (
    <ApolloProvider client={client}>
        <div className="container">
          <div className="main">
            <SingleUser />
            <GetUsers />
            <Form />
          </div>
        </div>
    </ApolloProvider> 
  );
}

export default App;
