import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Login from './Login'
import Register from './Register'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 5px;
  padding: 5px 5px;
  width: 200px;
  text-align: left;  
`;

export default class UserApp extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
    status: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      exstingUser: true
    }
  }

  render() {
    const formLogin = (
      <div>
        <Login login={this.props.login}/>
        <p>Not yet registered? click <u onClick={() => this.setState({exstingUser: false})}>here</u></p>
      </div>
    )
    const formRegister = (
      <div>
        <Register />
        <p>Already registered? click <u onClick={() => this.setState({exstingUser: true})}>here</u></p>
      </div>
    )
    const notLogged = this.state.exstingUser ? formLogin : formRegister

    const logged = (this.props.status.logged) ? <Redirect to="/protected" /> : notLogged

    return (
      <Box>
        {logged} 
      </Box>
    )
  }
}
