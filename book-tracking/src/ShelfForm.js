import React, { Component } from 'react'

class ShelfForm extends Component {
state = {
  value: this.props.shelfBook
}

// When select value is changed, update selected value
handleChange(id, event, myState) {
  this.setState({ value: event });
  this.props.myFunc(id, event, myState)
}

  render() {
    //const myShelf = this.props.shelfBook
    return (
      <div>
        <select value={this.state.value} onChange={(event)=> this.handleChange(this.props.id, event.target.value, this.props.myState)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
        </div>
    );
  }
}

export default ShelfForm