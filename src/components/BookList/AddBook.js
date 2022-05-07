import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

const GetAuthorsQuery = gql`
  query authorList {
    authors {
      id
      name
      age
    }
  }
`;
const AddBookMutation = gql`
  mutation addBookMutation {
    addBook(name: "", genre: "", authorId: "") {
      id
      name
      genre
    }
  }
`;

const AddBook = () => {
  // fetching data using useQuery hooks
  const {
    loading: authorLoading,
    error: authorError,
    data: authorData,
  } = useQuery(GetAuthorsQuery);

  // editing data using useMutation hooks
  const [
    addBook,
    { loading: addBookLoading, error: addBookError, data: addBookData },
  ] = useMutation(AddBookMutation);

  console.log(addBookData);

  const [fieldValues, setFieldValues] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const handleChange = (e) => {
    setFieldValues({ ...fieldValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, genre, authorId } = fieldValues;
    console.log(name, genre, authorId);
    addBook({ variables: { name, genre, authorId } });
  };

  return (
    <div>
      <h2>Add Book</h2>

      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Book name:</label>
          <input type="text" name="name" id="name" onChange={handleChange} />
        </div>

        <div className="field">
          <label htmlFor="genre">Book genre:</label>
          <input type="text" name="genre" id="genre" onChange={handleChange} />
        </div>

        <div className="field">
          <label>Book author:</label>
          <select name="authorId" onChange={handleChange}>
            <option>Select author</option>
            {authorLoading && <option disabled>Loading Authors...</option>}
            {authorData &&
              authorData.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
          </select>
        </div>
        {authorError && <p>{authorError.message}</p>}
        {addBookError && <p>{addBookError.message}</p>}

        {!addBookLoading && <button type="submit">+</button>}
        {addBookLoading && <p>Submitting data</p>}
      </form>
    </div>
  );
};

export default AddBook;
