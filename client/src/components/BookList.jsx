import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

export class BookListComponent extends Component {
  displayBooks() {
    const { loading, books } = this.props.data;
    if (loading) {
      return <li>Loading</li>;
    }
    return books.map(book => <li key={book.id}>{book.name}</li>);
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
      </div>
    );
  }
}

export const BookList = graphql(getBooksQuery)(BookListComponent);
