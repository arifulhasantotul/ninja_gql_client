import { gql, useQuery } from "@apollo/client";
import React from "react";

// construction of query
const getBooksQuery = gql`
  {
    books {
      id
      name
      genre
      author {
        name
        age
      }
    }
  }
`;

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  // console.log(loading, error, data);
  return (
    <div>
      <h2>Book List</h2>
      {loading && <p>Loading book list...</p>}
      {error && <p>{error}</p>}
      {data && (
        <ul id="book-list">
          {data.books.map((book) => (
            <div key={book.id}>
              <li>Name: {book.name}</li>
              <li>Genre: {book.genre}</li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;
