import React, { Component } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import uuid from 'uuid'
import axios from 'axios'

import Todo from './Todo'
import NewTodoForm from './NewTodoForm';

const Box = styled.div`
  text-align: left;
`;

export default class TodoList extends Component {
  static propTypes = {
    status: PropTypes.object.isRequired
  }


  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
    this.handleAddToDo = this.handleAddToDo.bind(this)
    this.handleEditToDo = this.handleEditToDo.bind(this)
  }

  componentDidMount() {
    const AuthStr = 'bearer ' + this.props.status.token
    axios
      .get(process.env.REACT_APP_SERVER + 'todos/' + this.props.status.userId, { headers: { Authorization: AuthStr }})
      .then(res =>{
        const newState = {...this.state, todos: res.data}
        this.setState(newState)
      })
  }

  handeDelete(e) {
    const AuthStr = 'bearer ' + this.props.status.token
    const { todos } = this.state;
    this.setState({todos: todos.slice(0, e).concat(todos.slice(e+1))}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'todos/delete/', {
          _id: todos[e]._id
        },{ headers: { Authorization: AuthStr }})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  handleToggle(idx) {
    const AuthStr = 'bearer ' + this.props.status.token
    let newTodos = this.state.todos.slice()
    newTodos[idx].done = !newTodos[idx].done;
    this.setState({todos: newTodos}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'todos/update/', {
          id: newTodos[idx]._id,
          title: newTodos[idx].title,
          done: newTodos[idx].done          
        },{ headers: { Authorization: AuthStr }})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  handleAddToDo(data) {
    const AuthStr = 'bearer ' + this.props.status.token
    let newTodos = this.state.todos.slice()
    newTodos.push({
      _id: uuid.v4(),
      title: data.title,
      done: false,
      createdBy: this.props.status.userId
    })
    this.setState({todos: newTodos}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'todos/create/', {
          title: data.title,
          createdBy: this.props.status.userId
        },{ headers: { Authorization: AuthStr }})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  handleEditToDo(data) {
    const AuthStr = 'bearer ' + this.props.status.token
    let newTodos = this.state.todos.slice()
    const index = newTodos.findIndex(x => x._id === data._id);
    newTodos[index].title = data.title;
    this.setState({todos: newTodos}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'todos/update/', {
          id: newTodos[index]._id,
          title: data.title,
          done: data.done          
        },{ headers: { Authorization: AuthStr }})
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  render() {
    const list = this.state.todos.map((todo, idx) => {
      return (
        <Todo  
          key={todo._id}
          todo={todo} 
          delete={this.handeDelete.bind(this, idx)} 
          toggle={this.handleToggle.bind(this, idx)}
          edit={this.handleEditToDo.bind(this)}
        />
      )
    });

    return (
      <Box>
        {list}
        <NewTodoForm handleAddToDo={this.handleAddToDo}/>
      </Box>
    );
  }
}
