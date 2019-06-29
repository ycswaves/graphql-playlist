import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

const displayDetails = bookData => {
  const { loading, book } = bookData;
  console.log(bookData);

  if (loading || !book) {
    return null;
  }

  return (
    <div>
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <p>All books by this author:</p>
      <ul>
        {book.author.books.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};
const BookDetailsComponent = props => {
  return <div>{displayDetails(props.data)}</div>;
};

export const BookDetails = graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetailsComponent);
