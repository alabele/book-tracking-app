import React, { Component } from 'react'

class ShelfForm extends Component {
  constructor(props) {
    super(props);
    this.state        = { shelf: '' } ;
    this.handleChange = this.handleChange.bind(this);

  }
  // handleSubmit = (e) => {
  //   e.preventDefault
  //   if (this.props.onUpdateShelf)
  //     this.props.onUpdateShelf(values)
  // }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // When select value is changed, update selected value
  handleChange(event) {
    this.setState({ shelf: event.currentTarget.value });
    this.props.onUpdateShelf
  }

  render() {
    return (
        <select value={this.state.shelf} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
    );
  }
}

export default ShelfForm