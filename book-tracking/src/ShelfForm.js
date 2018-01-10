import React, { Component } from 'react'

class ShelfForm extends Component {
state = {
  value: this.props.shelfBook
}

// When select value is changed, update selected value
handleChange(id, event) {
  this.setState({ value: event });
  console.log(id);
  this.props.myFunc(id, event)
}

  render() {
    //const myShelf = this.props.shelfBook
    return (
      <div>
        <select value={this.state.value} onChange={(event)=> this.handleChange(this.props.id, event.target.value)}>
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

export default ShelfForm