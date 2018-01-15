import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import ListBooks from './ListBooks'
//import ShelfForm from './ShelfForm'
import * as BooksAPI from './BooksAPI'
import _ from 'lodash'

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
		//let prevBookArray = this.state.shelvedBooks
		let prevBookArray = this.props.books

		// Grab IDs of shelved books array
		let myBookIds = prevBookArray.map((book) =>book.id)

		BooksAPI.search(query).then(searchQuery => {

			if (searchQuery === "" || searchQuery === undefined ) {
                this.setState({ searchedBooks: [] });
                return
            }

			else if (searchQuery.length > 0) {
				//Grab the IDs of any already shelved books from SearchedBooks array
				let shelvedSearchBooksID = searchQuery.filter((c) => true === myBookIds.includes(c.id)).map((book) =>book.id)

				let shelvedSearchBooks = prevBookArray.filter((c) => false === shelvedSearchBooksID.includes(c.id))

				//Remove any already shelved books from search array
				searchQuery = searchQuery.filter((c) => false === myBookIds.includes(c.id))

				//For remaining books, set a shelf property to "none" for newQuery + add back in shelved Books
				searchQuery.map((book) => book.shelf ="none")
				searchQuery = searchQuery.concat(shelvedSearchBooks)

			      this.setState(state => ({
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
			              <ListBooks
		                      books={this.props.books}
		                      activeShelf="all"
		                      onUpdateShelf={this.props.onUpdateShelf}
		                   />
	              </ol>
	            </div>
          </div>
		)
	}
}

export default SearchBooks