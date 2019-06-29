import React, { Component, createRef } from 'react';
import { graphql, compose } from 'react-apollo';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

class AddBookComponent extends Component {
  constructor(props) {
    super(props);
    this.form = createRef();
  }

  displayAuthors() {
    const { loading, authors } = this.props.getAuthorsQuery;
    if (loading) {
      return null;
    }
    return authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(this.form.current);

    const dataObj = Array.from(formData.entries()).reduce(
      (acc, [fieldName, value]) => ({
        ...acc,
        [fieldName]: value
      }),
      {}
    );

    this.props.addBookMutation({
      variables: dataObj,
      refetchQueries: [{ query: getBooksQuery }]
    });

    this.form.current.reset();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="add-book" ref={this.form}>
        <div className="field">
          <label htmlFor="">Book Name:</label>
          <input type="text" name="name" id="" />
        </div>
        <div className="field">
          <label htmlFor="">Genre:</label>
          <input type="text" name="genre" id="" />
        </div>
        <div className="field">
          <label htmlFor="">Author:</label>
          <select name="authorId" id="">
            <option value="">Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export const AddBook = compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBookComponent);
