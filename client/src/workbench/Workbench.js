import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

import TodosApp from './TodosApp/TodoApps'
import BookmarksApp from './BookmarksApp/BookmarksApp'
import WeatherApp from './WeatherApp/WeatherApp'

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class Workbench extends Component { 
  static propTypes = {
    status: PropTypes.object.isRequired
  } 
  render() {
      return (
      <Box>
        <BookmarksApp key='1' status={this.props.status}/>
        <TodosApp key='2' status={this.props.status} />
        <WeatherApp key='3'/>
      </Box>
    );
  }
}

export default Workbench;
