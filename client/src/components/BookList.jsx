import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import { BookDetails } from './BookDetails';

const displayBooks = (selectHandler, bookData) => {
  const { loading, books } = bookData;

  if (loading) {
    return <li>Loading</li>;
  }

  return books.map(book => (
    <li key={book.id} onClick={() => selectHandler(book.id)}>
      {book.name}
    </li>
  ));
};

export const BookListComponent = props => {
  const [selected, setSelected] = useState();

  return (
    <div>
      <ul id="book-list">{displayBooks(setSelected, props.data)}</ul>
      <BookDetails bookId={selected} />
    </div>
  );
};

export const BookList = graphql(getBooksQuery)(BookListComponent);
