import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios'

import TodosApp from './TodosApp/TodoApps'
import BookmarksApp from './BookmarksApp/BookmarksApp'
import WeatherApp from './WeatherApp/WeatherApp'
import UserApp from './UserApp/UserApp'

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class Workbench extends Component {

  constructor(props) {
    super(props)
    this.state = {
      logged: false,
      userId: '',
      userName: '',
      token: ''
    };
  }

  handleLogin = (token, userId, userName, logged) => {
    if (token) {
      this.setState({token, userId}, () => {
        const AuthStr = 'bearer ' + token
        axios.get(process.env.REACT_APP_SERVER + 'checktoken',{ headers: { Authorization: AuthStr }})
          .then(res => {
            this.setState({token, logged, userId, userName})
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
      this.setState({token: '', userId: '', userName:'', logged: false})
    }
  }
  
  render() {
  const returnIfLogged = this.state.logged ? [<BookmarksApp key='1' status={this.state}/>,<TodosApp key='2' status={this.state} />,<WeatherApp key='3'/>] : null

    return (
      <Box>
        {returnIfLogged}
        <UserApp key='4' login={this.handleLogin} status={this.state}/>
      </Box>
    );
  }
}

export default Workbench;
