import React, { Component } from 'react';
import {Route,NavLink, BrowserRouter as Router, Switch} from 'react-router-dom';
import styled from 'styled-components';

import Home from './Home';
import Notfound from './Notfound'
import Workbench from './workbench/Workbench';
import Earlyapps from './earlyapps/Earlyapps';
import RogueDungen from './roguedungeon/RogueDungeon'
import Login from './login/Login'

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
  margin: 5px;
  padding: 5px;
`
const TileLast = styled.li`
  margin: 5px;
  padding: 5px;
`
const styleNavLink = {color: "#f2f2f2"}
const styleActiveNavLink = {color: "#ff9933"}

class App extends Component {
  render() {
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
                <NavLink style={styleNavLink} activeStyle={styleActiveNavLink} to="/workbench">
                  Workbench
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
              <TileLast>
                <NavLink style={styleNavLink} activeStyle={styleActiveNavLink} to="/login">
                  Login
                </NavLink>
              </TileLast>
            </Menu>
          </NavBar>
          <hr />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/workbench" component={Workbench} />
            <Route path="/earlyapps" component={Earlyapps} />
            <Route path="/roguedungeon" component={RogueDungen} />
            <Route path="/login" component={Login} />
            <Route component={Notfound} />
          </Switch>
        </Body>
      </Router>
    );
  }
}

export default App;
