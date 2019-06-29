import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

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
