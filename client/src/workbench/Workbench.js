import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios'

import TodosApp from './TodosApp/TodoApps'
import BookmarksApp from './BookmarksApp/BookmarksApp'
import WeatherApp from './WeatherApp/WeatherApp'
import UserApp from './UserApp/UserApp'

const Box = styled.div`
  display: flex;
`

class Workbench extends Component {

  constructor(props) {
    super(props)
    this.state = {
      logged: false,
      userId: '',
      token: ''
    };
  }

  handleLogin = (token, userId, logged) => {
    if (token) {
      this.setState({token, userId}, () => {
        const AuthStr = 'bearer ' + token
        axios.get(process.env.REACT_APP_SERVER + 'checktoken',{ headers: { Authorization: AuthStr }})
          .then(res => {
            this.setState({token, logged, userId})
          })
          .catch(error => {
            if (error.status === 401) {
              this.setState({logged: false})
              return
            } 
            return error;    
          })
      })
    } else {
      this.setState({token: '', userId: '', logged: false})
    }
  }
  
  render() {
  const returnIfLogged = this.state.logged ? [<BookmarksApp />,<TodosApp status={this.state} />,<WeatherApp />] : null

    return (
      <Box>
        {returnIfLogged}
        <UserApp login={this.handleLogin} status={this.state}/>
      </Box>
    );
  }
}

export default Workbench;
