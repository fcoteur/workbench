import React, { Component } from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import axios from 'axios';

const Current = styled.div`
  padding: 5px 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

export default class WeaterCurrent extends Component {

  static propTypes = {
    city: PropTypes.string.isRequired
  }
  
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null
    };
    this.fetchForecast = this.fetchForecast.bind(this)
  }

  componentDidMount() {
    this.fetchForecast()
  }

  componentDidUpdate(prevProps) {
    if (this.props.city !== prevProps.city) {
      this.fetchForecast()
    }
  }

  fetchForecast() {
    const urlWeather =  'https://api.openweathermap.org/data/2.5/weather?q=' + this.props.city +'&units=metric&appid=' + process.env.REACT_APP_APIKEY
   
    this.setState({ isLoading: true });

    axios.get(urlWeather)
      .then(result => {
        this.setState({data: result.data, isLoading: false})
      })
      .catch(error => this.setState({
        error,
        isLoading: false
      }));
  }
  
  render() {

    const { data, isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading | !data) {
      return <p>Loading ...</p>;
    } 

    // select two forecasts per 24h and limit display to 4 days maximum
    if (data) {
      var currentWeather = (
            <Current>
              <img src={"http://openweathermap.org/img/w/" + data.weather[0].icon +".png"} alt={data.weather[0].description} />
              <span>{Math.round(data.main.temp)}°</span>
            </Current>
          )
    } 
    

    return (
      <div>
        {currentWeather}
      </div>
    )

  }
}
