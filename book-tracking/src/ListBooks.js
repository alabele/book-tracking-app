import React, { Component } from 'react'
//import ShelfForm from './ShelfForm'
//import {Link} from 'react-router-dom'
//import PropTypes from 'prop-types'
//import SortBy from 'sort-by'
//import escapeRegExp from 'escape-string-regexp'

class ListBooks extends Component {
	// static PropTypes = {
	// 	contacts: PropTypes.array.isRequired,
	// 	onDeleteContact: PropTypes.func.isRequired
	// }
	state = {
		query: ''
	}

	// updateQuery = (query) => {
	// 	this.setState({query:query.trim()})
	// }



	render() {
		const {books} = this.props
		const {query} = this.state
		const currentShelf = this.props.activeShelf
		// function isCurrentlyReading(book) {
		//   return book.shelf === 'currentlyReading';
		// }
		//let currentlyReadingShelf = books.map().filter(books.shelf === 'currentlyReading')
		return (
			<div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter(book=>book.shelf===currentShelf).map((book) =>
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                        <div className="book-shelf-changer">
                          <select value={this.state.shelf} onChange={this.handleChange}>
					          <option value="none" disabled>Move to...</option>
					          <option value="currentlyReading">Currently Reading</option>
					          <option value="wantToRead">Want to Read</option>
					          <option value="read">Read</option>
					          <option value="none">None</option>
					        </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors[0]}</div>
                    </div>
                  </li>
                  )}
             	</ol>
         	</div>
		)
	}
}

// ListContacts.propTypes = {
// 	contacts: PropTypes.array.isRequired,
// 	onDeleteContact: PropTypes.func.isRequired
// }

export default ListBooks