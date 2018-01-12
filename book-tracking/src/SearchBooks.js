import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import SearchShelfForm from './SearchShelfForm'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
	state = {
		query: '',
		shelvedBooks:[],
		searchedBooks:[]
	}

	componentDidMount() {
	     BooksAPI.getAll().then((shelvedBooks)=> {
	       this.setState({shelvedBooks})
	     })
  	}

	updateQuery = (query) => {
		// trim query string
		this.setState({query:query.trim()})

		// Grab shelved books array
		let prevBookArray = this.state.shelvedBooks
		//let prevBookArray = this.props.books

		// Grab IDs of shelved books array
		let myBookIds = prevBookArray.map((book) =>book.id)
		// console.log( myBookIds)
		// console.log(prevBookArray)


		BooksAPI.search(query).then(searchQuery => {
			//Grab array of all 20 books in the new query

			//console.log(searchQuery)
			if (searchQuery.length > 0) {
				//Filter out any already shelved books from search array
				searchQuery = searchQuery.filter((c) => false === myBookIds.includes(c.id))

				//For remaining books, set a shelf property to "none" for newQuery
				searchQuery.map((book) => book.shelf ="none")

				//console.log(newQuery)
			      this.setState(state => ({
			        // searchedBooks: state.searchedBooks.concat(newQuery)
			         searchedBooks: searchQuery
		       }))
		  	}
	     })
	}


	render() {
		const myNewFunc = this.props.onUpdateShelf
		const {query} = this.state
		let showingBooks
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
		 	showingBooks = this.state.searchedBooks.filter((book) => match.test(book.title) || match.test(book.authors))

		  } else {
		 	showingBooks = []

		 }


		return(

			<div className="search-books">
		        <div className="search-books-bar">
		          <Link
                		to="/"
                		className="close-search"
                >	Close</Link>
		          <div className="search-books-input-wrapper">
		            {/*
		              NOTES: The search from BooksAPI is limited to a particular set of search terms.
		              You can find these search terms here:
		              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

		              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
		              you don't find a specific author or title. Every search is limited by search terms.
		            */}
		            <input
		            	type="text"
	            		placeholder="Search by title or author"
	            		value={this.state.query}
						onChange={(event)=> this.updateQuery(event.target.value)}
            		/>

		          </div>
		        </div>
	            <div className="search-books-results">
	              <ol className="books-grid">
	              	{showingBooks.map((book) =>
	                  <li key={book.id}>
	                    <div className="book">
	                      <div className="book-top">
	                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
	                        <div className="book-shelf-changer">
	                        	<SearchShelfForm
	                        		shelfBook={book.shelf}
	                        		id={book.id}
	                        		searchState={this.state.searchedBooks}
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
          </div>
		)
	}
}

export default SearchBooks