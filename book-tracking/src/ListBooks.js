import React, { Component } from 'react'
import ShelfForm from './ShelfForm'
import PropTypes from 'prop-types'

class ListBooks extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		onUpdateShelf: PropTypes.func.isRequired
	}



	render() {
		const {books} = this.props
		const currentShelf = this.props.activeShelf
		const myNewFunc = this.props.onUpdateShelf
    let bookArray = []
    if (currentShelf === "all") {
      bookArray = books
    } else if (currentShelf !== "all") {
      bookArray = books.filter(book=>book.shelf===currentShelf)
    }
    console.log(bookArray)
		return (
                <ol className="books-grid">

                {bookArray.map((book) =>
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail?`${book.imageLinks.smallThumbnail}`:`http://via.placeholder.com/128x193?text=No%20Cover`})`}}></div>
                        <div className="book-shelf-changer">
                        	<ShelfForm
                        		shelfBook={book.shelf}
                        		id={book.id}
                        		myFunc={myNewFunc}
                        	/>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{Array.isArray(book.authors)?book.authors.join(', '):''}</div>
                    </div>
                  </li>
                  )}
             	</ol>
		)
	}
}

 ListBooks.propTypes = {
 	books: PropTypes.array.isRequired,
 	onUpdateShelf: PropTypes.func.isRequired
 }

export default ListBooks