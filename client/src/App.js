import React, { Component } from 'react';
import {
  Route,
  NavLink, 
  BrowserRouter as Router, 
  Switch,
  Redirect,
  withRouter} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'

import Home from './Home';
import Workbench from './workbench/Workbench';
import Earlyapps from './earlyapps/Earlyapps';
import RogueDungen from './roguedungeon/RogueDungeon';
import UserApp from './AuthApp/UserApp'
import Logout from './AuthApp/Logout'

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavBar = styled.div`
  background: #333333;
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
`
const Tile = styled.li`
  display: flex;
  margin: 5px;
  padding: 5px;
  border: 1pt solid black
`

const styleNavLink = {color: "#f2f2f2", display: "flex", alignItems: "center" }
const styleActiveNavLink = {color: "#ff9933"}

class App extends Component {
  
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
    const AuthButton = withRouter(
      ({ history }) =>
        this.state.logged ? (
          <span style={{color: "#cc0000"}}>
            {this.state.userName + " "}
            <Logout login={this.handleLogin}/>
          </span>
        ) : (
          <p style={{color: "white"}}>You are not logged in.</p>
        )
    );

    const PrivateRoute = ({ component: Component, ...rest }) => {
      return (
        <Route
          {...rest}
          render={props =>
            this.state.logged ? (
              <Component {...props}  status={this.state}/>
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
    }

    return (
      <Router>
        <Body>
          <NavBar>
            <Menu>
              <Tile>
                <NavLink exact style={styleNavLink} activeStyle={styleActiveNavLink} to="/">
                  Home
                </NavLink>
              </Tile>
              <Tile>
                <NavLink style={styleNavLink} activeStyle={styleActiveNavLink} to="/protected">
                  Workbench (protected)
                </NavLink>
              </Tile>
              <Tile>
                <NavLink style={styleNavLink} activeStyle={styleActiveNavLink} to="/earlyapps">
                  Early Applications
                </NavLink>
              </Tile>
              <Tile>
                <NavLink style={styleNavLink} activeStyle={styleActiveNavLink} to="/roguedungeon">
                  RogueDungen
                </NavLink>
              </Tile>
              <Tile>
                <AuthButton />
              </Tile>
            </Menu>
          </NavBar>
          <hr />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/protected" component={Workbench} />
            <Route path="/earlyapps" component={Earlyapps} />
            <Route path="/roguedungeon" component={RogueDungen} /> 
            <Route path="/login" render={(props) => <UserApp {...props} login={this.handleLogin} status={this.state}/>} /> 
          </Switch>
        </Body>
      </Router>
    );
  }
}

export default App;
