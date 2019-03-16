import React, { Component } from 'react';

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: '',
      name: ''
    };
  }
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }
  onSubmit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_SERVER + 'users/register', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 200) {
        alert('registered')
      }
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in, please try again');
    });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>
          <p>
            <label htmlFor="name">name </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </p>
          <p>
            <label htmlFor="email">email </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </p>
          <p>
            <label htmlFor="password">password </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </p>
          <input type="submit" value="Submit"/>
        </fieldset>
      </form>
    );
  }
}