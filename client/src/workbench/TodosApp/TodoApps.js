import React, { Component } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'

import TodoList from './TodoList'

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 200px;
  text-align: left;
  border: 1pt solid black;
`;

export default class TodoApp extends Component {

  static propTypes = {
    status: PropTypes.object.isRequired
  }

  render() {
    return (
      <Box>
        <span><strong>To Do List</strong></span>
        <TodoList status={this.props.status} />
      </Box>
    )
  }
}
