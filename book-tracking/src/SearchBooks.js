import React, {Component} from 'react'
import {Link} from 'react-router-dom'
//import escapeRegExp from 'escape-string-regexp'
import ShelfForm from './ShelfForm'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
	state = {
		query: '',
		allBooks:[]
	}

	componentDidMount() {
	    BooksAPI.getAll().then((allBooks)=> {
	      this.setState({allBooks})
	    })
	    // BooksAPI.search("a").then((allBooks) => {
	    // 	this.setState({allBooks})
	    // })
  	}

	updateQuery = (query) => {
		// trim query string
		this.setState({query:query.trim()})

		// Grab existing books array
		let prevBookArray = this.state.allBooks
		//let prevBookArray = this.props.books

		// Grab IDs of existing books array
		let myBookIds = prevBookArray.map((book) =>book.id)
		console.log( myBookIds)
		console.log(prevBookArray)
		BooksAPI.search(query).then(allBooks => {
			//Grab array of all 20 books in the new query
			let newQuery = []
			newQuery = allBooks

			//set a shelf property to "none" for newQuery
			newQuery.map((book) => book.shelf ="howdy there")

			//Filter out existing books (that already have a shelf defined)
			newQuery.filter((c) => c.id !== myBookIds)

			console.log(newQuery)
		      this.setState(state => ({
		          allBooks: state.allBooks.concat(newQuery)
	       }))
	     })
	}


	render() {
		const myNewFunc = this.props.onUpdateShelf
		 const {allBooks} = this.state
		// let showingBooks
		// if (query) {

		// 	const match = new RegExp(escapeRegExp(query), 'i')
		// 	showingBooks = this.state.allBooks.filter((book) => match.test(book.title) || match.test(book.authors))

		//  } else {
		//  	showingBooks = this.state.allBooks

		//  }


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
            		{JSON.stringify(this.state.query)}

		          </div>
		        </div>
	            <div className="search-books-results">
	              <ol className="books-grid">
	              	{allBooks.map((book) =>
	                  <li key={book.id}>
	                    <div className="book">
	                      <div className="book-top">
	                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
	                        <div className="book-shelf-changer">

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