import React, { Component } from 'react';
import TodosApp from './TodosApp/TodoApps'
import BookmarksApp from './BookmarksApp/BookmarksApp'
import WeatherApp from './WeatherApp/WeatherApp'

class Workbench extends Component {
  render() {
    return (
      <div>
        <BookmarksApp />
        <TodosApp />
        <WeatherApp />
      </div>
    );
  }
}

export default Workbench;
