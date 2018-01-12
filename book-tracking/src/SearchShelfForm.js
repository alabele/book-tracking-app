import React, { Component } from 'react'

class SearchShelfForm extends Component {
state = {
  value: this.props.shelfBook
}

// When select value is changed, update selected value
handleChange(id, event, searchState) {
  this.setState({ value: event });
  console.log(id);
  this.props.myFunc(id, event, searchState)
}

  render() {
    //const myShelf = this.props.shelfBook
    return (
      <div>
        <select value={this.state.value} onChange={(event)=> this.handleChange(this.props.id, event.target.value, this.props.searchState)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
        <span>{this.state.value}</span>
        <span>{this.props.id}</span>
        </div>
    );
  }
}

export default SearchShelfForm