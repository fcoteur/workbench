import React, { Component } from 'react'
import styled from 'styled-components';

import WeatherForcast from './WeatherForecast'
import WeatherForm from './WeatherForm'
import WeaterCurrent from './WeatherCurrent';

const Box = styled.div`
  margin: 5px 5px;
  padding: 5px 5px;
  width: 400px;
  text-align: left;
  border: 1pt solid black;
`;

const Box2 = styled.div`
  flex: 1;
  display: flex;
`;

const Box3 = styled.div`
  display: flex;
`;

export default class WeatherApp extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      city: 'Haarlem,nl'
    };
    this.handleNewCity = this.handleNewCity.bind(this)
  }

  handleNewCity(city) {
    this.setState({city})
  }

  render() {
    return (
      <Box>
        <Box3>
          <Box2>
            <span><strong>Weather</strong> in&nbsp;</span>
            <WeatherForm city={this.state.city} newCity={this.handleNewCity}/>
          </Box2>
          <WeaterCurrent city={this.state.city}/>
        </Box3>
        <WeatherForcast city={this.state.city}/>
      </Box>
    )

  }
}
