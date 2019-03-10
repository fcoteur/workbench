import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Login from './Login'
import Logout from './Logout'
import Register from './Register'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 5px;
  padding: 5px 5px;
  width: 400px;
  text-align: left;
  border: 1pt solid black;
`;


export default class UserApp extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
    status: PropTypes.object,
  }

  render() {
    const logged = this.props.status.logged ? "Logged!" : null
    const logout = this.props.status.logged ? <Logout login={this.props.login}/> : null
    return (
      <Box>
        <p><strong>{logged}</strong></p>
        {logout}
        <Login login={this.props.login}/>
        <Register />
      </Box>
    )
  }
}
