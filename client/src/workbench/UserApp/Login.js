import React, { Component } from 'react';
import PropTypes from 'prop-types'

export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      email : '',
      password: ''
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

    fetch(process.env.REACT_APP_SERVER + 'users/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      res.json().then((val) => {
        if (val.token) {
          this.props.login(val.token, val.userId, true)
        }
      })
       
    })
    .catch(err => {
      console.error(err);
      alert('Error logging in, please try again');
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <fieldset>
            <legend>Login</legend>
            <label for="email">email </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              size="15"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <br />
            <label for="password">password </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              size="15"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <br />
            <input type="submit" value="Submit"/>
          </fieldset>
        </form>
      </div>
    );
  }
}