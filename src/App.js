import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import AuthorList from "./components/AuthorList/AuthorList";
import AddBook from "./components/BookList/AddBook";
import BookList from "./components/BookList/BookList";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Ninja's Reading List</h1>
        <BookList />
        <AddBook />
        <AuthorList />
      </div>
    </ApolloProvider>
  );
}

export default App;
