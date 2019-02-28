import React, { Component } from 'react'
import styled from 'styled-components';
import TodoList from './TodoList'

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 400px;
  text-align: left;
  border: 1pt solid black;
`;

export default class TodoApp extends Component {
  render() {
    return (
      <Box>
        <span><strong>To Do List</strong></span>
        <TodoList />
      </Box>
    )
  }
}
