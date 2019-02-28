import React, { Component } from 'react'
import styled from 'styled-components';
import uuid from 'uuid'
import axios from 'axios'

import Todo from './Todo'
import NewTodoForm from './NewTodoForm';

const Box = styled.div`
  text-align: left;
`;

export default class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
    this.handleAddToDo = this.handleAddToDo.bind(this)
    this.handleEditToDo = this.handleEditToDo.bind(this)
  }

  componentDidMount() {
    axios
      .get(process.env.REACT_APP_SERVER + 'todos')
      .then(res =>{
        const newState = {...this.state, todos: res.data}
        this.setState(newState)
      })
  }

  handeDelete(e) {
    const { todos } = this.state;
    this.setState({todos: todos.slice(0, e).concat(todos.slice(e+1))}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'todos/delete/', {
          _id: todos[e]._id
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  handleToggle(idx) {
    let newTodos = this.state.todos.slice()
    newTodos[idx].done = !newTodos[idx].done;
    this.setState({todos: newTodos}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'todos/update/', {
          id: newTodos[idx]._id,
          title: newTodos[idx].title,
          done: newTodos[idx].done          
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  handleAddToDo(data) {
    let newTodos = this.state.todos.slice()
    newTodos.push({
      _id: uuid.v4(),
      title: data.title,
      done: false
    })
    this.setState({todos: newTodos}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'todos/create/', {
          title: data.title,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

  handleEditToDo(data) {
    let newTodos = this.state.todos.slice()
    const index = newTodos.findIndex(x => x._id === data._id);
    newTodos[index].title = data.title;
    this.setState({todos: newTodos}, () => {
      axios
        .post(process.env.REACT_APP_SERVER + 'todos/update/', {
          id: newTodos[index]._id,
          title: data.title,
          done: data.done          
        })
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
        <NewTodoForm handleAddToDo={this.handleAddToDo}/>
        {list}
      </Box>
    );
  }
}
