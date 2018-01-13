import React, { Component } from 'react'
import ShelfForm from './ShelfForm'
import PropTypes from 'prop-types'

class ListBooks extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}
	state = {
		// query: ''
	}



	render() {
		const {books} = this.props
		const currentShelf = this.props.activeShelf
		const myNewFunc = this.props.onUpdateShelf
		return (
			<div className="bookshelf-books">
                <ol className="books-grid">
                {books.filter(book=>book.shelf===currentShelf).map((book) =>
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                        <div className="book-shelf-changer">
                        	<ShelfForm
                        		shelfBook={book.shelf}
                        		id={book.id}
                        		myFunc={myNewFunc}
                        	/>
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

 ListBooks.propTypes = {
 	books: PropTypes.array.isRequired,
 	onUpdateShelf: PropTypes.func.isRequired
 }

export default ListBooks