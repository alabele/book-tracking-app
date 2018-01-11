import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import {Link, Route} from 'react-router-dom'
//import escapeRegExp from 'escape-string-regexp'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }
  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
      this.setState({books})
    })
  }


  updateShelf(bookId, shelf) {
      function myBook(b) {
          return b.id === bookId;
      }
      let myObject = this.state.books
      myObject = myObject.find(myBook)
      myObject.shelf = shelf
      console.log(myObject)
      BooksAPI.update(bookId, shelf).then(book => {
       this.setState(state => ({
          books: state.books.filter((c) => c.id !== bookId).concat(myObject)
       }))
     })
    BooksAPI.update(myObject, shelf)
   }

  // bookSearch(query) {
  //   console.log(query)
  //   BooksAPI.search(query)
  //     BooksAPI.search(query).then(book => {
  //      this.setState({this.state.books})
  //   })
  //  }


  render() {
    return (
      <div className="app">

        <Route path="/search" exact render={() => (
          <SearchBooks
            books={this.state.books}
            onUpdateShelf={(book, shelf)=> {
                        this.updateShelf(book,shelf)
                      }}
            // onBookSearch={(query)=> {
            //             this.bookSearch(query)
            //           }}

          />
       )} />
       <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                   <ListBooks
                      books={this.state.books}
                      activeShelf="currentlyReading"
                      onUpdateShelf={(book, shelf)=> {
                        this.updateShelf(book,shelf)
                      }}
                   />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                     <ListBooks
                      books={this.state.books}
                      activeShelf="wantToRead"
                      onUpdateShelf={(book, shelf)=> {
                        this.updateShelf(book,shelf)
                      }}
                   />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                   <ListBooks
                      books={this.state.books}
                      activeShelf="read"
                      onUpdateShelf={(book, shelf)=> {
                        this.updateShelf(book,shelf)
                      }}
                   />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search">
                Add a book
              </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
