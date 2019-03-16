import React, { Component } from 'react'
import styled from 'styled-components';

import WeatherForcast from './WeatherForecast'
import WeaterCurrent from './WeatherCurrent';
import FormLocation from './FormLocation';

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
      city: 'Haarlem',
      country: "NL",
      formVisible: false
    };
    this.handleNewCity = this.handleNewCity.bind(this)
    this.handleNewCountry = this.handleNewCountry.bind(this)
  }

  handleNewCity(city) {
    this.setState({city, formVisible: false})
  }

  handleNewCountry(country) {
    this.setState({country})
  }

  render() {
    const view = this.state.formVisible ? 
      <FormLocation 
        country={this.state.country}
        city={this.state.city}
        newCity={this.handleNewCity}
        newCountry={this.handleNewCountry}
        /> : null

    return (
      <Box>
        <Box3>
          <Box2>
            <span><strong>Weather</strong> in {this.state.city}</span>
            <span onClick={() => this.setState({formVisible: true})}>{String.fromCharCode(0xD83D,0xDD8B)}</span>
            {view}
          </Box2>
          <WeaterCurrent city={this.state.city}/>
        </Box3>
        <WeatherForcast city={this.state.city}/>
      </Box>
    )

  }
}
