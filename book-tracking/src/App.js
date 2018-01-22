import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import ErrorPage404 from './ErrorPage404'
import {Link, Route, Switch} from 'react-router-dom'
//import escapeRegExp from 'escape-string-regexp'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  componentDidMount() {
    BooksAPI.getAll().then((books)=> {
      this.setState({books})
    })
  }


  updateShelf(bookId, shelf, myState) {
      function myBook(b) {
          return b.id === bookId;
      }
     let myObject = myState
      myObject = myObject.find(myBook)
      myObject.shelf = shelf
      BooksAPI.update(myObject, shelf).then(book => {
       this.setState(state => ({
          books: state.books.filter((c) => c.id !== bookId).concat(myObject)
       }))
     })
   }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search" exact render={() => (
            <SearchBooks
              books={this.state.books}
              onUpdateShelf={(book, shelf, searchState)=> {
                  this.updateShelf(book,shelf, searchState)
                }}
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
                      <div className="bookshelf-books">
                         <ListBooks
                            books={this.state.books}
                            activeShelf="currentlyReading"
                            myState={this.state.books}
                            onUpdateShelf={(book, shelf, myState)=> {
                              this.updateShelf(book,shelf,myState)
                            }}
                         />
                      </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                           <ListBooks
                            books={this.state.books}
                            activeShelf="wantToRead"
                            myState={this.state.books}
                            onUpdateShelf={(book, shelf, myState)=> {
                              this.updateShelf(book,shelf,myState)
                            }}

                         />
                      </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                         <ListBooks
                            books={this.state.books}
                            activeShelf="read"
                            myState={this.state.books}
                            onUpdateShelf={(book, shelf, myState)=> {
                              this.updateShelf(book,shelf,myState)
                            }}

                         />
                      </div>
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
          <Route component={ErrorPage404}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
